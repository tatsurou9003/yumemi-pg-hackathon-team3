import json
import boto3
import os

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("users")

def lambda_handler(event, context):
    # API GatewayのリクエストコンテキストからCognitoのclaimsを取得し、subを抽出
    claims = event.get("requestContext", {}).get("authorizer", {}).get("claims", {})
    user_sub = claims.get("sub")
    if not user_sub:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "User sub not found in token"})
        }
    
    # リクエストボディのパース
    try:
        body = json.loads(event.get("body", "{}"))
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid JSON body", "details": str(e)})
        }
    
    # 更新対象の属性を取得
    user_name    = body.get("userName")
    profile_image = body.get("profileImage")
    profile_color = body.get("profileColor")
    
    # 更新用のUpdateExpressionの作成
    update_expression = "SET userName = :uname, profileImage = :pimg, profileColor = :pcolor"
    expression_attribute_values = {
        ":uname": user_name,
        ":pimg": profile_image,
        ":pcolor": profile_color
    }
    
    try:
        # DynamoDBのupdate_itemで既存のアイテムを更新
        response = table.update_item(
            Key={"userId": user_sub},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values,
            ReturnValues="UPDATED_NEW"
        )
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Error updating DynamoDB", "details": str(e)})
        }
    
    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "User profile updated successfully",
            "updatedAttributes": response.get("Attributes")
        })
    }

