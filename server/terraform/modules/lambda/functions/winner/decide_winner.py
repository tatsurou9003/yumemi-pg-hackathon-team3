import json
import boto3
import os
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime

# DynamoDBのリソースとテーブルの取得
dynamodb = boto3.resource("dynamodb")
messages_table = dynamodb.Table("messages")

def lambda_handler(event, context):
    try:
        now = datetime.now.isoformat()
        
        # 締め切り時間を過ぎたTHEMEメッセージを検索
        scan_response = messages_table.scan(
            FilterExpression=Attr("messageType").eq("THEME") & 
                            Attr("deadline").lt(now) &
                            Attr("winner").not_exists()
        )
        
        theme_items = scan_response.get("Items", [])
        processed_themes = 0
        
        print(f"締め切りを過ぎたテーマ数: {len(theme_items)}")
        
        for theme in theme_items:
            theme_id = theme.get("messageId")
            group_id = theme.get("groupId")
            
            # テーマへの回答を取得
            answer_response = messages_table.scan(
                FilterExpression=Attr("messageType").eq("ANSWER") & 
                                Attr("parentId").eq(theme_id)
            )
            
            answers = answer_response.get("Items", [])
            
            if not answers:
                print(f"テーマ {theme_id} への回答がありません。スキップします。")
                continue
            
            # いいね数でランキング（likesフィールドまたはlikeCountフィールドを使用）
            # まずlikeCountフィールドがあるか確認
            ranked_answers = sorted(answers, key=lambda x: x.get("likeCount", 0), reverse=True)     
            
            if not ranked_answers:
                print(f"テーマ {theme_id} のランキングができませんでした。スキップします。")
                continue
            
            # 1位の回答を取得
            winner_answer = ranked_answers[0]
            winner_id = winner_answer.get("createdBy")
            
            # いいね数を取得（フィールド名に合わせて調整）
            like_count = winner_answer.get("likeCount", 0)
            
            if not winner_id:
                print(f"テーマ {theme_id} の勝者IDが取得できませんでした。スキップします。")
                continue
            
            # テーマにウィナーを登録
            try:
                print(f"テーマ {theme_id} の勝者を更新: {winner_id}, いいね数: {like_count}")
                
                messages_table.update_item(
                    Key={
                        "messageId": theme_id,
                    },
                    UpdateExpression="SET winner = :winner",
                    ExpressionAttributeValues={
                        ":winner": winner_id,
                    }
                )
            except Exception as e:
                print(f"テーマ {theme_id} の更新中にエラーが発生しました: {str(e)}")
                continue
        
        return {
            "statusCode": 200,
        }
            
    except Exception as e:
        print(f"エラー: {str(e)}")
        import traceback
        print(traceback.format_exc())
        return {
            "statusCode": 500,
            "body": json.dumps({
                "error": str(e)
            })
        }