import boto3
import os
import json
from boto3.dynamodb.conditions import Key

# DynamoDBクライアントの初期化
dynamodb = boto3.resource('dynamodb')
users_table = dynamodb.Table("users")
groups_table = dynamodb.Table("groups")
group_members_table = dynamodb.Table("group_members")

def lambda_handler(event, context):
    try:
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
                "body": json.dumps({"error": "User ID not found in token"})
            }
        
        # ユーザー情報の取得
        user_response = users_table.get_item(
            Key={"userId": user_id}
        )
        
        if "Item" not in user_response:
            return {
                "statusCode": 404,
                "headers": headers,
                "body": json.dumps({"error": "User not found"})
            }
        
        user = user_response["Item"]
        
        # Group_membersテーブルからユーザーが所属するグループを取得
        group_members_response = group_members_table.query(
            IndexName="UserGroupIndex",
            KeyConditionExpression=Key("userId").eq(user_id)
        )
        
        groups_data = []
        
        # 各グループの詳細を取得
        for membership in group_members_response.get("Items", []):
            group_id = membership.get("groupId")
            
            # グループ情報を取得
            group_response = groups_table.get_item(
                Key={"groupId": group_id}
            )
            
            if "Item" in group_response:
                group = group_response["Item"]
                
                # グループ情報とメンバーシップ情報を結合
                group_info = {
                    "groupId": group_id,
                    "groupName": group.get("groupName", ""),
                    "groupImage": group.get("groupImage", ""),
                    "role": membership.get("role", ""),
                    "memberCount": int(group.get("memberCount", 0)),
                    "status": membership.get("status", ""),
                    "invitedBy": membership.get("invitedBy", "")
                }
                
                groups_data.append(group_info)
        
        # 最終的なレスポンス用データを構築
        response_data = {
            "userId": user.get("userId", ""),
            "email": user.get("email", ""),
            "userName": user.get("userName", ""),
            "profileImage": user.get("profileImage", ""),
            "profileColor": user.get("profileColor", ""),
            "groups": groups_data
        }
        
        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps(response_data)
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"error": f"Internal server error: {str(e)}"})
        }