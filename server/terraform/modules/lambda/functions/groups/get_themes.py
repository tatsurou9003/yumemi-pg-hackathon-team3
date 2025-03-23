import json
import boto3
import os
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
users_table = dynamodb.Table("users")
groups_table = dynamodb.Table("groups")
group_members_table = dynamodb.Table("group_members")
messages_table = dynamodb.Table("messages")

def lambda_handler(event, context):
    
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
    }
    
    # リクエストボディのパース
    try:
        body = json.loads(event.get("body", "{}"))
    except json.JSONDecodeError:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"message": "Invalid request body"})
        }
    
    try:
        # リクエストの検証
        group_id = body.get("groupId")
        
        if not group_id:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"message": "groupId is required"})
            }
            
        # グループ情報を取得
        group_response = groups_table.get_item(
            Key={
                'groupId': group_id
            }
        )
        
        if 'Item' not in group_response:
            return {
                "statusCode": 404,
                "headers": headers,
                "body": json.dumps({"message": "Group not found"})
            }
        
        group = group_response['Item']
            
        # グループのテーマメッセージを取得
        messages_response = messages_table.query(
            IndexName="GroupAllThemesIndex",
            KeyConditionExpression=Key("groupId").eq(group_id) & Key("messageTypeCreatedAt").begins_with("THEME#"),
            ScanIndexForward=False  # 降順（最新のテーマから）
        )
        
        themes = []
        
        for message in messages_response.get('Items', []):
            # テーマを作成したユーザーの情報を取得
            creator_id = message.get('createdBy')
            creator_info = {}
            
            if creator_id:
                creator_response = users_table.get_item(
                    Key={
                        'userId': creator_id
                    }
                )
                
                if 'Item' in creator_response:
                    creator = creator_response['Item']
                    creator_info = {
                        'userId': creator_id,
                        'userName': creator.get('userName', ''),
                        'profileImage': creator.get('profileImage', ''),
                        'profileColor': creator.get('profileColor', '')
                    }
                else:
                    creator_info = {
                        'userId': creator_id,
                        'userName': '不明なユーザー',
                        'profileImage': '',
                        'profileColor': ''
                    }
                
                # テーマ情報を構築
                theme_info = {
                    'messageId': message.get('messageId', ''),
                    'messageType': message.get('messageType', ''),
                    'messageText': message.get('messageText', ''),
                    'messageImage': message.get('messageImage', ''),
                    'prizeText': message.get('prizeText', ''),
                    'deadline': message.get('deadline', ''),
                    'winner': message.get('winner', ''),
                    'createdBy': creator_info,
                    'createdAt': message.get('createdAt', '')
                }
                
                themes.append(theme_info)
            
        # レスポンスの作成
        response_body = [{
            'groupId': group_id,
            'themes': themes
        }]
        
        return {
            'statusCode': 200,
            'headers': headers,
            'body': json.dumps(response_body)
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'message': f'Internal server error: {str(e)}'})
        }