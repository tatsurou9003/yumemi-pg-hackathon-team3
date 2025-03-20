import boto3
import os

# DynamoDBクライアントの初期化
dynamodb = boto3.resource('dynamodb')
users_table = dynamodb.Table("users")

def lambda_handler(event, context):
    # requestContextからユーザーのsubを取得
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_id = claims.get("sub")
    
    try:
        # DynamoDBからユーザー情報を取得
        response = users_table.get_item(
            Key={
                'userId': user_id
            }
        )
        
        # ユーザー情報が存在するか確認
        if 'Item' not in response:
            return {
                "statusCode": 404,
                "body": "User not found"
            }
        
        user_item = response['Item']
        
        # userNameが存在し、空でないか確認
        if 'userName' not in user_item or not user_item['userName'].strip():
            return {
                "statusCode": 404,
                "body": "Username not set"
            }
        
        # ユーザー名が設定されている場合
        return {
            "statusCode": 200,
            "body": "User profile complete"
        }
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            "statusCode": 500,
            "body": "Internal server error"
        }
