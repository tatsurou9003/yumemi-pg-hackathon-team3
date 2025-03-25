import boto3
import os
import json

# DynamoDBクライアントの初期化
dynamodb = boto3.resource('dynamodb')
users_table = dynamodb.Table("users")

def lambda_handler(event, context):
    # requestContextからユーザーのsubを取得
    query_params = event.get("queryStringParameters", {}) or {}
    user_id = query_params.get("userId", "")

    headers = {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers" : "*",
                    "Access-Control-Allow-Origin": "*", #　とりあえずWildCardで許可
                    "Access-Control-Allow-Methods": "GET"
            }

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
                "headers": headers,
                "body": json.dumps({"message": "User not found"})
            }
        
        user_item = response['Item']
        
        # 必要なフィールドのみを含む辞書を作成
        user_data = {
            "userId": user_item.get("userId", ""),
            "userName": user_item.get("userName", ""),
            "profileImage": user_item.get("profileImage", ""),
            "profileColor": user_item.get("profileColor", "")
        }

        # ユーザー情報を返す
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(user_data)
        }
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"message": "Internal server error"})
        }