# ER 図

## DynamoDB 設計

```mermaid
---
title: "wa-life"
---
erDiagram
    USERS {
        string userId PK "uuid"
        string userName "ユーザー名"
        string email "メールアドレス"
        string password "パスワード"
        string profileImage "プロフィール画像のURL"
        string profileColor "プロフィール背景色"
        string createdAt "作成日時"
    }

    GROUPS {
        string groupId PK "uuid"
        string groupName "グループ名"
        number memberCount "グループのメンバー数"
        string groupImage "グループ画像のURL"
        string createdBy "作成したユーザーID"
        string createdAt "作成日時"
    }

    GROUP_MEMBERS {
        string groupId PK "uuid, GSI:RK"
        string userId "uuid, SK, GSI:HK"
        string role "ロール"
        string status "INVITED, JOINED, REJECTED"
        string invitedBy "招待したユーザーのID"
        string joinedAt "参加日時"
    }

    MESSAGES {
        string messageId PK "uuid"
        string groupId "uuid, SK, GSI1,2:HK"
        string messageType "THEME or CHAT"
        string messageText "お題もしくはチャットメッセージ"
        string messageImage "アップロード画像"
        string prizeText "賞品説明"
        string deadline "回答期限"
        string winner "勝者のユーザーID"
        string createdBy "作成者のユーザーID"
        string createdAt "作成日時, GSI1:RK"
        string messageTypeCreatedAt "messageType#createdAt（複合ソートキー, GSI2:RK"
    }

    ANSWERS {
        string answerId "uuid, SK"
        string parentId PK "親となるテーマのメッセージID, GSI:HK"
        string answerText "回答文"
        string answerImage "回答画像"
        string createdBy "作成者のユーザーID"
        string createdAt　"作成日時"
        number goodCount　"いいねの数, GSI:RK"
    }

    GOODLOGS {
        string logId PK "uuid"
        string answerId "いいねされたメッセージID, GSI:HK"
        string userId "いいねしたユーザーID"
        string createdAt "作成・更新日時, GSI:RK"
    }

    USERS ||--o{ GROUPS : "作成"
    USERS ||--o{ GROUP_MEMBERS : "参加"
    USERS ||--o{ MESSAGES : "投稿"
    USERS ||--o{ ANSWERS : "回答"
    USERS ||--o{ GOODLOGS : "いいね"

    GROUPS ||--o{ MESSAGES : "持つ
    GROUPS ||--o{ GROUP_MEMBERS : "参加者"

    GROUP_MEMBERS }|--|| USERS : "参加"
    GROUP_MEMBERS }|--|| GROUPS : "所属"

    MESSAGES ||--o{ ANSWERS : "回答"
    MESSAGES ||--o{ GOODLOGS : "いいね"

    GOODLOGS }|--|| USERS : "いいねした"

```
