import json
import boto3
import os
import uuid
from datetime import datetime

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
answers_table = dynamodb.Table("answers")
messages_table = dynamodb.Table("messages")
users_table = dynamodb.Table("users")

def lambda_handler(event, context):
    # API GatewayのリクエストコンテキストからCognitoのclaimsを取得し、subを抽出
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_id = claims.get("sub")
    
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST"
    }
    
    # ユーザーIDのチェック
    if not user_id:
        return {
            "statusCode": 401,
            "headers": headers,
            "body": json.dumps({"message": "ユーザー認証が必要です"})
        }
    
    try:
        # パスパラメータから親テーマのメッセージIDを取得
        path_parameters = event.get("pathParameters", {})
        parent_id = path_parameters.get("messageId")
        
        if not parent_id:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"message": "テーマIDが指定されていません"})
            }
        
        # リクエストボディのパース
        try:
            body = json.loads(event.get("body", "{}"))
        except json.JSONDecodeError:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"message": "無効なリクエストボディです"})
            }
        
        # リクエストボディのバリデーション
        answer_text = body.get("answerText", "")
        answer_image = body.get("answerImage", "")
        
        if not answer_text and not answer_image:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"message": "回答テキストまたは画像が必要です"})
            }
        
        # 親テーマが存在するか確認
        parent_message = messages_table.get_item(
            Key={"messageId": parent_id}
        ).get("Item")
        
        if not parent_message:
            return {
                "statusCode": 404,
                "headers": headers,
                "body": json.dumps({"message": "指定されたテーマが見つかりません"})
            }
        
        # テーマであることを確認
        if parent_message.get("messageType") != "THEME":
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"message": "指定されたメッセージはテーマではありません"})
            }
        
        # 締め切りチェック
        deadline = parent_message.get("deadline", "")
        if deadline:
            deadline_time = datetime.fromisoformat(deadline.replace("Z", "+00:00"))
            current_time = datetime.now().astimezone()
            
            if current_time > deadline_time:
                return {
                    "statusCode": 400,
                    "headers": headers,
                    "body": json.dumps({"message": "回答期限が過ぎています"})
                }
        
        # 新しい回答IDの生成
        answer_id = str(uuid.uuid4())
        current_time = datetime.now().isoformat()
        
        # 回答データの作成
        answer_item = {
            "answerId": answer_id,
            "parentId": parent_id,
            "answerText": answer_text,
            "answerImage": answer_image,
            "createdBy": user_id,
            "createdAt": current_time,
            "goodCount": 0  # いいね数の初期値
        }
        
        # DynamoDBに回答を保存
        answers_table.put_item(Item=answer_item)
        
        # ユーザー情報の取得（レスポンス用）
        user_info = users_table.get_item(
            Key={"userId": user_id}
        ).get("Item", {})
        
        return {
            "statusCode": 201,
            "headers": headers,
        }
        
    except Exception as e:
        print(f"エラー: {str(e)}")
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"message": f"内部サーバーエラー: {str(e)}"})
        }