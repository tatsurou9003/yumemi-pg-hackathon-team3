import json
import boto3
import os
import uuid
import base64
from datetime import datetime
from io import BytesIO

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
users_table = dynamodb.Table("users")
groups_table = dynamodb.Table("groups")
group_members_table = dynamodb.Table("group_members")

# S3クライアント
s3 = boto3.client('s3')
GROUP_IMAGES_BUCKET = 'wa-live-images-bucket-j9a3tvch'

def lambda_handler(event, context):
    # API GatewayのリクエストコンテキストからCognitoのclaimsを取得し、subを抽出
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_id = claims.get("sub")
    
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST,OPTIONS"
    }
    
    try:
        body = json.loads(event.get("body", "{}"))
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"message": "Invalid request body"})
        }
    
    # リクエストからグループ名、グループ画像、招待するユーザーのIDを取得
    group_name = body.get("groupName")
    group_image = body.get("groupImage")
    user_ids = body.get("userIds", [])
    
    if not group_name or not isinstance(user_ids, list):
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"message": "groupName is required and userIds must be an array"})
        }
    
    try:
        # DynamoDBからユーザー情報を取得
        user_response = users_table.get_item(
            Key={
                'userId': user_id
            }
        )
        
        if 'Item' not in user_response:
            return {
                "statusCode": 404,
                "headers": headers,
                "body": json.dumps({"message": "User not found"})
            }
        
        # グループIDの生成
        group_id = str(uuid.uuid4())
        current_time = datetime.now().isoformat()
        
        # 招待するユーザーが実在するか確認
        invited_users = []
        for invited_user_id in user_ids:
            if invited_user_id == user_id:
                continue  # 作成者自身は招待リストから除外
                
            invited_user = users_table.get_item(
                Key={
                    'userId': invited_user_id
                }
            )
            
            if 'Item' in invited_user:
                invited_users.append(invited_user_id)
        
        # 作成者を含めたメンバー数を計算
        member_count = len(invited_users) + 1  # 招待ユーザー + 作成者

        # 画像のS3アップロード処理
        group_image_url = ""
        if group_image and group_image.startswith('data:'):
            try:
                # データURLの形式: "data:image/jpeg;base64,/9j/4AAQS..."
                content_type = group_image.split(';')[0].split(':')[1]
                base64_data = group_image.split(',')[1]
                file_extension = content_type.split('/')[1]
                
                # Base64データをデコード
                image_data = base64.b64decode(base64_data)
                
                # S3にアップロード
                image_key = f"group-images/{group_id}.{file_extension}"
                s3.upload_fileobj(
                    BytesIO(image_data),
                    GROUP_IMAGES_BUCKET,
                    image_key,
                    ExtraArgs={
                        'ContentType': content_type,
                    }
                )
                
                # S3の公開URLを生成
                region = 'ap-northeast-1'
                group_image_url = f"https://{GROUP_IMAGES_BUCKET}.s3.{region}.amazonaws.com/{image_key}"
                print(f"画像をアップロードしました: {group_image_url}")
            except Exception as img_error:
                print(f"画像アップロードエラー: {str(img_error)}")
                # 画像アップロードに失敗してもグループ作成は続行
        
        # グループの作成
        groups_table.put_item(
            Item={
                'groupId': group_id,
                'groupName': group_name,
                'memberCount': member_count,
                'groupImage': group_image or "",
                'createdBy': user_id,
                'createdAt': current_time
            }
        )
        
        # 作成者をグループメンバーとして追加（JOINED状態）
        group_members_table.put_item(
            Item={
                'groupId': group_id,
                'userId': user_id,
                'role': 'ADMIN',  # 作成者は管理者
                'status': 'JOINED',  # 作成者は自動的に参加
                'invitedBy': user_id,  # 自分自身
                'joinedAt': current_time
            }
        )
        
        # 招待したユーザーをグループメンバーとして追加（INVITED状態）
        for invited_user_id in invited_users:
            group_members_table.put_item(
                Item={
                    'groupId': group_id,
                    'userId': invited_user_id,
                    'role': 'MEMBER',  # 招待されたユーザーはメンバー
                    'status': 'INVITED',  # 招待状態
                    'invitedBy': user_id,  # 招待したユーザー
                    'joinedAt': ""  # まだ参加していない
                }
            )
                    
        return {
            'statusCode': 201,
            'headers': headers,
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'message': f'Internal server error: {str(e)}'})
        }