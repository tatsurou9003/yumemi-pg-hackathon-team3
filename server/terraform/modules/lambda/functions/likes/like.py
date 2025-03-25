import json
import boto3
import os
from datetime import datetime
from decimal import Decimal
from boto3.dynamodb.conditions import Key, Attr

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
answers_table = dynamodb.Table("answers")
likes_table = dynamodb.Table("likes")

def lambda_handler(event, context):
    # API GatewayのリクエストコンテキストからCognitoのclaimsを取得し、subを抽出
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_id = claims.get("sub")
    
    headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT,DELETE,OPTIONS"
    }
    
    # ユーザーIDのチェック
    if not user_id:
        return {
            "statusCode": 401,
            "headers": headers,
            "body": json.dumps({"message": "認証が必要です"})
        }
    
    # パスパラメータから回答IDを取得
    path_parameters = event.get("pathParameters", {})
    answer_id = path_parameters.get("answerId")
    
    if not answer_id:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"message": "回答IDが指定されていません"})
        }
    
    try:
        # HTTPメソッドを取得（PUTはいいね、DELETEはいいね解除）
        http_method = event.get("httpMethod", "")
        
        # 回答が存在するかチェック
        answer_response = answers_table.get_item(
            Key={"answerId": answer_id}
        )
        
        if "Item" not in answer_response:
            return {
                "statusCode": 404,
                "headers": headers,
                "body": json.dumps({"message": "指定された回答が見つかりません"})
            }
        
        answer = answer_response["Item"]
        
        # いいねの確認
        like_exists = False
        like_response = likes_table.get_item(
            Key={
                "answerId": answer_id,
                "userId": user_id
            }
        )
        
        if "Item" in like_response:
            like_exists = True
        
        # いいねをつける（PUT）
        if http_method == "PUT":
            if like_exists:
                return {
                    "statusCode": 400,
                    "headers": headers,
                    "body": json.dumps({"message": "すでにいいねしています"})
                }
            
            # 現在時刻を取得
            current_time = datetime.now().isoformat()
            
            # いいねを追加
            likes_table.put_item(
                Item={
                    "answerId": answer_id,
                    "userId": user_id,
                    "createdAt": current_time
                }
            )
            
            # 回答のいいね数を更新（+1）
            answers_table.update_item(
                Key={"answerId": answer_id},
                UpdateExpression="SET goodCount = if_not_exists(goodCount, :zero) + :inc",
                ExpressionAttributeValues={
                    ":zero": 0,
                    ":inc": 1
                },
                ReturnValues="UPDATED_NEW"
            )
            
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({
                    "message": "いいねしました"
                })
            }
        
        # いいねを解除（DELETE）
        elif http_method == "DELETE":
            if not like_exists:
                return {
                    "statusCode": 400,
                    "headers": headers,
                    "body": json.dumps({"message": "いいねしていません"})
                }
            
            # いいねを削除
            likes_table.delete_item(
                Key={
                    "answerId": answer_id,
                    "userId": user_id
                }
            )
            
            # 回答のいいね数を更新（-1）、ただし0未満にはならないようにする
            current_good_count = int(answer.get("goodCount", 0))
            
            if current_good_count > 0:
                answers_table.update_item(
                    Key={"answerId": answer_id},
                    UpdateExpression="SET goodCount = goodCount - :dec",
                    ExpressionAttributeValues={":dec": 1},
                    ConditionExpression="goodCount > :zero",
                    ExpressionAttributeValues={
                        ":dec": 1,
                        ":zero": 0
                    },
                    ReturnValues="UPDATED_NEW"
                )
            
            return {
                "statusCode": 200,
                "headers": headers,
                "body": json.dumps({
                    "message": "いいねを解除しました"
                })
            }
        
        # サポートされていないHTTPメソッド
        else:
            return {
                "statusCode": 405,
                "headers": headers,
                "body": json.dumps({"message": "サポートされていないメソッドです"})
            }
    
    except Exception as e:
        print(f"エラー: {str(e)}")
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"message": f"内部サーバーエラー: {str(e)}"})
        }