import json
import boto3
import os
import uuid
from datetime import datetime

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
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PATCH"
    }
    
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
    status = body.get("status")
    
    if not group_id or not status:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"message": "groupId and status are required"})
        }
    
    # ステータスの検証（JOINED または REJECTED のみ許可）
    if status not in ["JOINED", "REJECTED"]:
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"message": "status must be either JOINED or REJECTED"})
        }
    
    try:
        # ユーザーがグループに招待されているか確認
        member_response = group_members_table.get_item(
            Key={
                'groupId': group_id,
                'userId': user_id
            }
        )
        
        if 'Item' not in member_response:
            return {
                "statusCode": 404,
                "headers": headers,
                "body": json.dumps({"message": "You are not invited to this group"})
            }
        
        member = member_response['Item']
        
        # 既に参加/拒否しているか確認
        current_status = member.get('status')
        if current_status != 'INVITED':
            return {
                "statusCode": 400,
                "headers": headers,
                "body": json.dumps({
                    "message": f"You have already {current_status.lower()} this group invitation"
                })
            }
        
        current_time = datetime.now().isoformat()
        
        # グループメンバーのステータスを更新
        update_expression = "SET #status = :status"
        expression_attribute_names = {'#status': 'status'}
        expression_attribute_values = {':status': status}
        
        # JOINEDの場合はjoinedAtも更新
        if status == "JOINED":
            update_expression += ", joinedAt = :joinedAt"
            expression_attribute_values[':joinedAt'] = current_time
        
        group_members_table.update_item(
            Key={
                'groupId': group_id,
                'userId': user_id
            },
            UpdateExpression=update_expression,
            ExpressionAttributeNames=expression_attribute_names,
            ExpressionAttributeValues=expression_attribute_values
        )
        
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
        
        # REJECTEDの場合はメンバー数を減らす
        if status == "REJECTED":
            current_member_count = int(group.get('memberCount', '0'))
            if current_member_count > 0:  # 負の値にならないように
                new_member_count = current_member_count - 1
                
                groups_table.update_item(
                    Key={
                        'groupId': group_id
                    },
                    UpdateExpression="SET memberCount = :count",
                    ExpressionAttributeValues={
                        ':count': new_member_count
                    }
                )
                
                group['memberCount'] = new_member_count
        
        return {
            'statusCode': 200,
            'headers': headers,
        }
        
    except Exception as e:
        print(f"Error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': headers,
            'body': json.dumps({'message': f'Internal server error: {str(e)}'})
        }