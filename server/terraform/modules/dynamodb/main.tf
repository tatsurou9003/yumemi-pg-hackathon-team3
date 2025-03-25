# Users Table
resource "aws_dynamodb_table" "users" {
    name           = "users"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "userId"
    attribute {
        name = "userId"
        type = "S"
    }
    tags = {
        Project = "Wa-Life"
    }
}

# Groups Table
resource "aws_dynamodb_table" "groups" {
    name = "groups"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "groupId"
    attribute {
        name = "groupId"
        type = "S"
    }
    tags = {
        Project = "Wa-Life"
    }
}

# Group Members Table
resource "aws_dynamodb_table" "group_members" {
    name = "group_members"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "groupId"
    range_key = "userId"
    attribute {
        name = "groupId"
        type = "S"
    }
    attribute {
        name = "userId"
        type = "S"
    }
    global_secondary_index {
        name = "UserGroupIndex"
        hash_key = "userId"
        range_key = "groupId"
        projection_type = "ALL"
        }
    tags = {
        Project = "Wa-Life"
    }

}

# Messages Table
resource "aws_dynamodb_table" "messages" {
    name = "messages"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "messageId"
    range_key = "groupId"
    attribute {
        name = "messageId"
        type = "S"
    }
    attribute {
        name = "groupId"
        type = "S"
    }
    attribute {
        name = "messageTypeCreatedAt"
        type = "S"
    }
    attribute {
        name = "createdAt"
        type = "S"
    }
    global_secondary_index {
        name = "GetAllChatIndex"
        hash_key = "groupId"
        range_key = "createdAt"
        projection_type = "ALL"
    }
    global_secondary_index {
        name = "GetAllThemesIndex"
        hash_key = "groupId"
        range_key = "messageTypeCreatedAt"
        projection_type = "ALL"
    }
    tags = {
        Project = "Wa-Life"
    }
}

# Answers Table
resource "aws_dynamodb_table" "answers" {
    name = "answers"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "parentId"
    range_key = "answerId"
    attribute {
        name = "parentId"
        type = "S"
    }
    attribute {
        name = "answerId"
        type = "S"
    }
    attribute {
        name = "goodCount"
        type = "N"
    }
    global_secondary_index {
        name = "RankingIndex"
        hash_key = "parentId"
        range_key = "goodCount"
        projection_type = "ALL"
    }
    tags = {
        Project = "Wa-Life"
    }
}

# Likes Table
resource "aws_dynamodb_table" "likes" {
    name = "likes"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "answerId"
    range_key = "userId"
    attribute {
        name = "answerId"
        type = "S"
    }
    attribute {
        name = "userId"
        type = "S"
    }
    tags = {
        Project = "Wa-Life"
    }
}

# 接続テーブル（WebSocket接続を追跡するためのDynamoDBテーブル）
resource "aws_dynamodb_table" "ws_connections" {
    name           = "ws-connections"
    billing_mode   = "PAY_PER_REQUEST"
    hash_key       = "connectionId"
    
    attribute {
        name = "connectionId"
        type = "S"
    }
    
    attribute {
        name = "userId"
        type = "S"
    }
    
    attribute {
        name = "groupId"
        type = "S"
    }
    
    # ユーザーIDでの検索用GSI
    global_secondary_index {
        name               = "UserIdIndex"
        hash_key           = "userId"
        projection_type    = "ALL"
    }
    
    # グループIDでの検索用GSI
    global_secondary_index {
        name               = "GroupIdIndex"
        hash_key           = "groupId"
        projection_type    = "ALL"
    }

        tags = {
        Project = "Wa-Life"
    }
}