import json
import boto3
import os
import uuid
from datetime import datetime
from boto3.dynamodb.conditions import Key

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
users_table = dynamodb.Table("users")
groups_table = dynamodb.Table("groups")
group_members_table = dynamodb.Table("group_members")

def lambda_handler(event, context):
    # API GatewayのリクエストコンテキストからCognitoのclaimsを取得し、subを抽出
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_id = claims.get("sub")
    
    headers = {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers" : "*",
                    "Access-Control-Allow-Origin": "*", #　とりあえずWildCardで許可
                    "Access-Control-Allow-Methods": "POST"
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
    
    # リクエストの検証
    path_parameters = event.get("pathParameters", {})
    group_id = path_parameters.get("groupId")
    user_ids = body.get("userIds", [])
    
    if not group_id or not isinstance(user_ids, list) or len(user_ids) == 0:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"message": "groupId is required and userIds must be a non-empty array"})
        }
    
    try:
        # グループが存在するか確認
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
        
        # 招待者がグループに所属しているか確認し、権限をチェック
        member_response = group_members_table.get_item(
            Key={
                'groupId': group_id,
                'userId': user_id
            }
        )
        
        if 'Item' not in member_response:
            return {
                "statusCode": 403,
                "headers": headers,
                "body": json.dumps({"message": "You are not a member of this group"})
            }
        
        member = member_response['Item']
        
        # 招待者の権限確認（ADMINかMEMBERかつJOINED状態のみ招待可能）
        if member.get('status') != 'JOINED' or (member.get('role') != 'ADMIN' and member.get('role') != 'MEMBER'):
            return {
                "statusCode": 403,
                "headers": headers,
                "body": json.dumps({"message": "You don't have permission to invite users to this group"})
            }
        
        # 招待するユーザーが実在するか確認し、既にグループに存在するユーザーを除外
        invited_users = []
        already_members = []
        non_existent_users = []
        
        for invited_user_id in user_ids:
            # 自分自身は招待できない
            if invited_user_id == user_id:
                continue
                
            # ユーザーが存在するか確認
            invited_user = users_table.get_item(
                Key={
                    'userId': invited_user_id
                }
            )
            
            if 'Item' not in invited_user:
                non_existent_users.append(invited_user_id)
                continue
            
            # ユーザーが既にグループに存在するか確認
            existing_member = group_members_table.get_item(
                Key={
                    'groupId': group_id,
                    'userId': invited_user_id
                }
            )
            
            if 'Item' in existing_member:
                already_members.append(invited_user_id)
                continue
            
            invited_users.append(invited_user_id)
        
        if len(invited_users) == 0:
            message = "No valid users to invite"
            if len(already_members) > 0:
                message += f". {len(already_members)} users are already members"
            if len(non_existent_users) > 0:
                message += f". {len(non_existent_users)} users don't exist"
                
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({"message": message})
            }
        
        # 現在のメンバー数を取得して更新
        current_member_count = int(group.get('memberCount', '0'))
        new_member_count = current_member_count + len(invited_users)
        
        # グループのメンバー数を更新
        groups_table.update_item(
            Key={
                'groupId': group_id
            },
            UpdateExpression="SET memberCount = :count",
            ExpressionAttributeValues={
                ':count': new_member_count
            }
        )
        
        # 招待したユーザーをグループメンバーとして追加（INVITED状態）
        current_time = datetime.now().isoformat()
        invited_user_details = []
        
        for invited_user_id in invited_users:
            group_members_table.put_item(
                Item={
                    'groupId': group_id,
                    'userId': invited_user_id,
                    'role': 'MEMBER',  # 招待されたユーザーはメンバー
                    'status': 'INVITED',  # 招待状態
                    'invitedBy': user_id,  # 招待したユーザー
                    'joinedAt': ""  # まだ参加していない
                }
            )
        
        return {
            'statusCode': 200,
            'headers': headers
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'message': f'Internal server error: {str(e)}'})
        }