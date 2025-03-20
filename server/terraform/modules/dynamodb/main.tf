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
    hash_key = "likeId"
    attribute {
        name = "likeId"
        type = "S"
    }
    tags = {
        Project = "Wa-Life"
    }
}