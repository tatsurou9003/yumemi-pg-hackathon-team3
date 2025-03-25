import json
import boto3
from datetime import datetime
import os

# DynamoDBリソースの取得
dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1')
table = dynamodb.Table("users")

def lambda_handler(event, context):
    print("Received event:", json.dumps(event))
    
    try:
        # Cognito のイベントからユーザー属性を抽出
        user_attributes = event["request"]["userAttributes"]
        user_sub = user_attributes.get("sub")
        user_email = user_attributes.get("email")
        
        if not user_sub or not user_email:
            raise ValueError("Missing required user attributes: 'sub' or 'email'")
        
        # 登録するデータの作成
        item = {
            'userId': user_sub,            
            'email': user_email,                   
            'createdAt': datetime.utcnow().isoformat()  
        }
        
        # DynamoDB に項目を登録
        table.put_item(Item=item)
        print("Successfully inserted item:", item)
        
    except Exception as e:
        print("Error processing event:", str(e))
        raise e

    # Cognito のイベントはそのまま返す
    return event
