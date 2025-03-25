import json
import boto3
import os
from boto3.dynamodb.conditions import Key
from datetime import datetime

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
connections_table = dynamodb.Table("ws-connections")

def lambda_handler(event, context):
    try:
        # 接続IDをイベントから取得
        connection_id = event["requestContext"]["connectionId"]
        
        # クエリパラメータからユーザーIDとグループIDを取得
        query_params = event.get("queryStringParameters", {}) or {}
        user_id = query_params.get("userId", "")
        group_id = query_params.get("groupId", "")
        
        # 現在のタイムスタンプを取得
        current_time = int(datetime.now().timestamp() * 1000)
        
        # 接続情報をDynamoDBに保存
        connections_table.put_item(
            Item={
                "connectionId": connection_id,  
                "userId": user_id,              
                "groupId": group_id,            
                "createdAt": current_time
            }
        )
        
        print(f"接続が確立されました: connectionId={connection_id}, userId={user_id}, groupId={group_id}")
        
        return {
            "statusCode": 200
        }
        
    except Exception as e:
        print(f"エラーが発生しました: {str(e)}")
        return {
            "statusCode": 200
        }