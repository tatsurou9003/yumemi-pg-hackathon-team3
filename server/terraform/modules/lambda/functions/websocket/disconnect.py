import json
import boto3

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
connections_table = dynamodb.Table("ws-connections")

def lambda_handler(event, context):
    # 接続IDの取得
    connection_id = event["requestContext"]["connectionId"]
    
    # 接続情報をDynamoDBから削除
    connections_table.delete_item(
        Key={
            "connectionId": connection_id
        }
    )
    
    return {"statusCode": 200}