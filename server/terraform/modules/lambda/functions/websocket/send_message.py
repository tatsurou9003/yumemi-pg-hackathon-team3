import json
import boto3
import uuid
from datetime import datetime
from boto3.dynamodb.conditions import Key

# クライアントで初期化
dynamodb = boto3.resource("dynamodb")
connections_table = dynamodb.Table("ws-connections")
messages_table = dynamodb.Table("messages")
users_table = dynamodb.Table("users")

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
        
        # メッセージデータを作成
        message_data = {
            "messageId": message_id,
            "groupId": body["groupId"],
            "messageType": body["messageType"], # CHAT, THEME
            "messageText": body["messageText"],
            "messageImage": body.get("messageImage", ""),
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
            "messageImage": body.get("messageImage", ""),
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