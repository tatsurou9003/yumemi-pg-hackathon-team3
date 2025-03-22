import boto3
import os
import json

# DynamoDBクライアントの初期化
dynamodb = boto3.resource('dynamodb')
users_table = dynamodb.Table("users")

def lambda_handler(event, context):
    # requestContextからユーザーのsubを取得
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_id = claims.get("sub")

    headers = {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers" : "*",
                    "Access-Control-Allow-Origin": "*", #　とりあえずWildCardで許可
                    "Access-Control-Allow-Methods": "GET"
            }
    
    if not user_id:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({
                "message": "User ID not found in token"
            })
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
                "body": json.dumps({
                    "message": "User not found",
                })
            }
        
        user_item = response['Item']
        
        # userNameが存在し、空でないか確認
        if 'userName' not in user_item or not user_item['userName'].strip():
            return {
                "statusCode": 200, 
                "headers": headers,
                "body": json.dumps({
                    "message": "Username not set",
                })
            }
        
        # ユーザー名が設定されている場合
        return {
            "statusCode": 404,
            "headers": headers,
            "body": json.dumps({
                "message": "User profile complete",
            })
        }
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({
                "message": f"Internal server error: {str(e)}"
            })
        }