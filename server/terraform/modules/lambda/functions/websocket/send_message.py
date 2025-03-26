import json
import boto3
import uuid
import base64
from datetime import datetime
from boto3.dynamodb.conditions import Key
from io import BytesIO
import os

# クライアントで初期化
dynamodb = boto3.resource("dynamodb")
connections_table = dynamodb.Table("ws-connections")
messages_table = dynamodb.Table("messages")
users_table = dynamodb.Table("users")

# S3クライアント
s3 = boto3.client('s3')
MESSAGE_IMAGES_BUCKET = 'wa-live-images-bucket-j9a3tvch'

def lambda_handler(event, context):
    # 接続IDの取得
    connection_id = event["requestContext"]["connectionId"]

    # API Gateway Management APIクライアント
    api_endpoint = f"https://{event['requestContext']['domainName']}/{event['requestContext']['stage']}"
    api_gw = boto3.client("apigatewaymanagementapi", endpoint_url=api_endpoint)
    
    try:
        # メッセージの内容を取得
        body = json.loads(event["body"])
        
        # 必須フィールドのチェック
        required_fields = ["action", "groupId", "messageType", "createdBy", "messageText"]
        for field in required_fields:
            if field not in body:
                return {"statusCode": 400, "body": f"Missing required field: {field}"}
        
        # メッセージIDを生成
        message_id = str(uuid.uuid4())
        created_at = datetime.now().isoformat()
        user_id = body["createdBy"]

        # 複合ソートキーを作成
        message_type_created_at = f"{body['messageType']}#{created_at}"

        # 画像のS3アップロード処理
        message_image_url = ""
        message_image = body.get("messageImage", "")
        
        if message_image and isinstance(message_image, str) and message_image.startswith('data:'):
            try:
                print("画像データのアップロードを開始します")
                # データURLの形式: "data:image/jpeg;base64,/9j/4AAQS..."
                content_type = message_image.split(';')[0].split(':')[1]
                base64_data = message_image.split(',')[1]
                file_extension = content_type.split('/')[1]
                
                # Base64データをデコード
                image_data = base64.b64decode(base64_data)
                
                # 一意のファイル名を生成
                image_file_name = f"message-{message_id}.{file_extension}"
                
                # S3にアップロード
                image_key = f"message-images/{body['groupId']}/{image_file_name}"
                s3.upload_fileobj(
                    BytesIO(image_data),
                    MESSAGE_IMAGES_BUCKET,
                    image_key,
                    ExtraArgs={
                        'ContentType': content_type
                    }
                )
                
                # S3の公開URLを生成
                region = 'ap-northeast-1'
                message_image_url = f"https://{MESSAGE_IMAGES_BUCKET}.s3.{region}.amazonaws.com/{image_key}"
                print(f"画像をアップロードしました: {message_image_url}")
                
            except Exception as img_error:
                print(f"画像アップロードエラー: {str(img_error)}")
                import traceback
                print(traceback.format_exc())
                # 画像アップロードに失敗してもメッセージ送信は続行
        else:
            print(f"画像データなし、または不正な形式: {message_image[:30]}...")

        
        # メッセージデータを作成
        message_data = {
            "messageId": message_id,
            "groupId": body["groupId"],
            "messageType": body["messageType"], # CHAT, THEME
            "messageText": body["messageText"],
            "messageImage": message_image_url,
            "createdBy": user_id, # 送信者の情報
            "createdAt": created_at,
            "messageTypeCreatedAt": message_type_created_at,
            "prizeText": body.get("prizeText", ""),
            "deadline": body.get("deadline", "")
        }
        
        # メッセージをDynamoDBに保存
        messages_table.put_item(Item=message_data)
        
        # ユーザー情報を取得
        user_response = users_table.get_item(
            Key={"userId": user_id}
        )
        
        user_info = {}
        if "Item" in user_response:
            user = user_response["Item"]
            user_info = {
                "userId": user_id,
                "userName": user.get("userName", ""),
                "profileImage": user.get("profileImage", ""),
                "profileColor": user.get("profileColor", "")
            }
        else:
            user_info = {
                "userId": user_id,
                "userName": "不明なユーザー",
                "profileImage": "",
                "profileColor": ""
            }
        
        # クライアントに送信するメッセージを作成
        send_data = {
            "messageId": message_id,
            "groupId": body["groupId"],
            "messageType": body["messageType"], # CHAT, THEME
            "messageText": body["messageText"],
            "messageImage": message_image_url,
            "createdBy": user_info, # 送信者の情報
            "createdAt": created_at,
            "prizeText": body.get("prizeText", ""),
            "deadline": body.get("deadline", "")
        }
        
        # 同じグループ内の全接続に送信
        # 送信するグループのユーザーのコネクションを取得
        group_connections = connections_table.query(
            IndexName="GroupIdIndex",
            KeyConditionExpression=Key("groupId").eq(body["groupId"])
        )
        
        # 送信者以外の全接続にメッセージを送信
        for connection in group_connections.get("Items", []):
            # 送信者自身には送信しない
            if connection["connectionId"] != connection_id:
                try:
                    api_gw.post_to_connection(
                        ConnectionId=connection["connectionId"],
                        Data=json.dumps(send_data)
                    )
                except Exception as e:
                    # 無効な接続は削除
                    if "GoneException" in str(e):
                        connections_table.delete_item(
                            Key={"connectionId": connection["connectionId"]}
                        )
        
        return {"statusCode": 200}
    
    except Exception as e:
        print(f"エラー: {str(e)}")
        return {"statusCode": 500, "body": str(e)}