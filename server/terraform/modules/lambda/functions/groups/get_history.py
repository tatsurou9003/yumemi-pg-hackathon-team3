import json
import boto3
import os
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime
from decimal import Decimal

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
users_table = dynamodb.Table("users")
groups_table = dynamodb.Table("groups")
messages_table = dynamodb.Table("messages")
group_members_table = dynamodb.Table("group_members")

def lambda_handler(event, context):
    
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
    }
    
    try:
        # API GatewayのリクエストコンテキストからCognitoのclaimsを取得し、subを抽出
        claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
        user_id = claims.get("sub")
        
        if not user_id:
            return {
                "statusCode": 401,
                "headers": headers,
                "body": json.dumps({"message": "認証が必要です"})
            }
        
        # リクエストの検証
        path_parameters = event.get("pathParameters", {})
        group_id = path_parameters.get("groupId")
        
        if not group_id:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"message": "グループIDが指定されていません"})
            }
                        
        query_params = {
            "IndexName": "GetAllChatIndex",
            "KeyConditionExpression": Key("groupId").eq(group_id),
            "ScanIndexForward": False,  # 新しいメッセージ順
        }
        
        # メッセージを取得
        messages_response = messages_table.query(**query_params)
        
        messages_items = messages_response.get("Items", [])
        
        # 作成者のユーザー情報を取得（バッチで効率的に）
        creator_ids = list(set([message.get("createdBy") for message in messages_items]))
        creator_info = {}
        
        # バッチで効率的にユーザー情報を取得
        for i in range(0, len(creator_ids), 25):  # DynamoDBのバッチ取得制限が25
            batch_ids = creator_ids[i:i+25]
            batch_keys = {
                "users": {
                    "Keys": [{"userId": creator_id} for creator_id in batch_ids]
                }
            }
            
            batch_response = dynamodb.batch_get_item(RequestItems=batch_keys)
            
            for user in batch_response.get("Responses", {}).get("users", []):
                creator_info[user.get("userId")] = {
                    "userId": user.get("userId"),
                    "userName": user.get("userName", ""),
                    "profileImage": user.get("profileImage", ""),
                    "profileColor": user.get("profileColor", "")
                }
        
        # メッセージに作成者情報を追加
        enriched_messages = []
        for message in messages_items:
            creator_id = message.get("createdBy")
            creator = creator_info.get(creator_id, {
                "userId": creator_id,
                "userName": "不明なユーザー",
                "profileImage": "",
                "profileColor": ""
            })
            
            enriched_message = {
                "messageId": message.get("messageId"),
                "messageType": message.get("messageType", "CHAT"),
                "messageText": message.get("messageText", ""),
                "messageImage": message.get("messageImage", ""),
                "createdAt": message.get("createdAt", ""),
                "createdBy": creator
            }
            
            # THEMEタイプの場合、追加のフィールドを含める
            if message.get("messageType") == "THEME":
                enriched_message.update({
                    "prizeText": message.get("prizeText", ""),
                    "deadline": message.get("deadline", ""),
                    "winner": message.get("winner", "")
                })
            
            enriched_messages.append(enriched_message)
        
        # レスポンスを構築
        response_data = {
            "groupId": group_id,
            "messages": enriched_messages
        }
        
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(response_data)
        }
        
    except Exception as e:
        print(f"エラー: {str(e)}")
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"message": f"内部サーバーエラー: {str(e)}"})
        }