import json
import boto3
import os
from boto3.dynamodb.conditions import Key
from decimal import Decimal

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
answers_table = dynamodb.Table("answers")
users_table = dynamodb.Table("users")
likes_table = dynamodb.Table("likes")

def lambda_handler(event, context):
    # API GatewayのリクエストコンテキストからCognitoのclaimsを取得し、subを抽出
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_id = claims.get("sub")
    
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET"
    }
    
    try:
        # パスパラメータからテーマIDを取得
        path_parameters = event.get("pathParameters", {})
        message_id = path_parameters.get("messageId")
        
        if not message_id:
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"message": "テーマIDが指定されていません"})
            }
        

        # 作成日時順にソート（通常のクエリ）
        response = answers_table.query(
            KeyConditionExpression=Key("parentId").eq(message_id),
            ScanIndexForward=False  # 降順（新しい順）
        )
        
        answers = response.get("Items", [])
        
        # 作成者情報を追加
        enriched_answers = []
        
        for answer in answers:
            creator_id = answer.get("createdBy")
            
            # ユーザー情報を取得
            user_response = users_table.get_item(
                Key={"userId": creator_id}
            )
            
            user_info = {}
            if "Item" in user_response:
                user = user_response["Item"]
                user_info = {
                    "userId": creator_id,
                    "userName": user.get("userName", ""),
                    "profileImage": user.get("profileImage", ""),
                    "profileColor": user.get("profileColor", "")
                }
            else:
                user_info = {
                    "userId": creator_id,
                    "userName": "不明なユーザー",
                    "profileImage": "",
                    "profileColor": ""
                }
            
            # 現在のユーザーがいいねしているかどうか
            liked = False
            if user_id:
                likes_response = likes_table.get_item(
                    Key={
                        "answerId": answer.get("answerId"),
                        "userId": user_id
                    }
                )
                liked = "Item" in likes_response
            
            # 回答情報を整形
            enriched_answer = {
                "answerId": answer.get("answerId"),
                "parentId": answer.get("parentId"),
                "answerText": answer.get("answerText", ""),
                "createdAt": answer.get("createdAt", ""),
                "goodCount": int(answer.get("goodCount", 0)),
                "isliked": liked,
                "createdBy": user_info
            }
            
            enriched_answers.append(enriched_answer)
        
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(enriched_answers)
        }
        
    except Exception as e:
        print(f"エラー: {str(e)}")
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"message": f"内部サーバーエラー: {str(e)}"})
        }