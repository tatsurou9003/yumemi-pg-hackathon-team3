import json
import boto3
import os
import uuid
import base64
from datetime import datetime
from io import BytesIO

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("users")

# S3クライアント
s3 = boto3.client('s3')
PROFILE_IMAGES_BUCKET = 'wa-live-images-bucket-j9a3tvch'

def lambda_handler(event, context):
    # API GatewayのリクエストコンテキストからCognitoのclaimsを取得し、subを抽出
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_sub = claims.get("sub")
    
    headers = {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers" : "*",
                    "Access-Control-Allow-Origin": "*", #　とりあえずWildCardで許可
                    "Access-Control-Allow-Methods": "PUT"
            }

    if not user_sub:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "User sub not found in token"})
        }
    
    # リクエストボディのパース
    try:
        body = json.loads(event.get("body", "{}"))
    except Exception as e:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Invalid JSON body", "details": str(e)})
        }
    
    # 更新対象の属性を取得
    user_name    = body.get("userName")
    profile_image = body.get("profileImage")
    profile_color = body.get("profileColor")

    # プロフィール画像の処理
    profile_image_url = ""
    if profile_image and isinstance(profile_image, str) and profile_image.startswith('data:'):
        try:
            # データURLの形式: "data:image/jpeg;base64,/9j/4AAQS..."
            content_type = profile_image.split(';')[0].split(':')[1]
            base64_data = profile_image.split(',')[1]
            file_extension = content_type.split('/')[1]
            
            # Base64データをデコード
            image_data = base64.b64decode(base64_data)
            
            # 一意のファイル名を生成
            file_name = f"{user_sub}_{uuid.uuid4().hex[:8]}.{file_extension}"
            
            # S3にアップロード
            image_key = f"profile-images/{file_name}"
            s3.upload_fileobj(
                BytesIO(image_data),
                PROFILE_IMAGES_BUCKET,
                image_key,
                ExtraArgs={
                    'ContentType': content_type,
                }
            )
            
            # S3の公開URLを生成
            region = 'ap-northeast-1'
            profile_image_url = f"https://{PROFILE_IMAGES_BUCKET}.s3.{region}.amazonaws.com/{image_key}"
            print(f"画像をアップロードしました: {profile_image_url}")
            
        except Exception as img_error:
            print(f"画像アップロードエラー: {str(img_error)}")
            # 画像アップロードに失敗しても処理は続行（既存のプロフィール画像を維持）
            pass
    
    # 更新用のUpdateExpressionの作成
    update_expression_parts = []
    expression_attribute_values = {}
    
    if user_name is not None:
        update_expression_parts.append("userName = :uname")
        expression_attribute_values[":uname"] = user_name
    
    if profile_color is not None:
        update_expression_parts.append("profileColor = :pcolor")
        expression_attribute_values[":pcolor"] = profile_color
    
    # 画像のURLが取得できた場合のみ更新
    if profile_image_url:
        update_expression_parts.append("profileImage = :pimg")
        expression_attribute_values[":pimg"] = profile_image_url
    # 画像データがnullや空文字列の場合も許可（プロフィール画像の削除）
    elif profile_image is None or profile_image == "":
        update_expression_parts.append("profileImage = :pimg")
        expression_attribute_values[":pimg"] = ""
    
    # 更新対象がない場合
    if not update_expression_parts:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "No attributes to update"})
        }
    
    # SET句の作成
    update_expression = "SET " + ", ".join(update_expression_parts)
    
    try:
        # DynamoDBのupdate_itemで既存のアイテムを更新
        response = table.update_item(
            Key={"userId": user_sub},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW"
        )
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": "Error updating DynamoDB", "details": str(e)})
        }
    
    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({
            "message": "User profile updated successfully",
            "updatedAttributes": response.get("Attributes")
        })
    }

