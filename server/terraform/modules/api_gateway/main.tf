# REST API Gatewayを作成
resource "aws_api_gateway_rest_api" "api" {
  name        = var.api_gateway_name
  description = "REST API Gateway connected to Lambda"
}

# Usersのルートリソースを追加
resource "aws_api_gateway_resource" "users" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "users"
}

# プロフィール更新リソース
resource "aws_api_gateway_resource" "profile" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.users.id
  path_part   = "profile"
}

# 初回ログインチェックリソース
resource "aws_api_gateway_resource" "first_login_check" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.users.id
  path_part   = "first_login_check"
}

# ホーム画面で取得するユーザーデータリソース
resource "aws_api_gateway_resource" "home" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.users.id
  path_part   = "home"
}

# ユーザー検索リソース
resource "aws_api_gateway_resource" "search" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.users.id
  path_part   = "search"
}

# Groupsのルートリソースを追加
resource "aws_api_gateway_resource" "groups" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "groups"
}

# グループ作成リソース
resource "aws_api_gateway_resource" "create_group" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.groups.id
  path_part   = "create"
}

# テーマ取得リソース
resource "aws_api_gateway_resource" "get_themes" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.groups.id
  path_part   = "themes"
}

# グループ招待リソース
resource "aws_api_gateway_resource" "invite_group" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.groups.id
  path_part   = "invite"
}

# メンバー更新リソース
resource "aws_api_gateway_resource" "update_member" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.groups.id
  path_part   = "update_member"
}

# Cognitoオーソライザーを追加
resource "aws_api_gateway_authorizer" "cognito" {
  name          = "cognito-authorizer"
  rest_api_id   = aws_api_gateway_rest_api.api.id
  type          = "COGNITO_USER_POOLS"
  provider_arns = [var.cognito_user_pool_arn]
}

# Users周りのメソッド
# プロフィール更新メソッド
resource "aws_api_gateway_method" "profile" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.profile.id
  http_method   = "PUT"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

# 初回ログインチェックメソッド
resource "aws_api_gateway_method" "first_login_check" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.first_login_check.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

# ホーム画面で取得するユーザーデータメソッド
resource "aws_api_gateway_method" "home" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.home.id
  http_method   = "GET"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

# ユーザー検索メソッド
resource "aws_api_gateway_method" "search" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.search.id
  http_method   = "GET"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

# Groups周りのメソッド
# グループ作成メソッド
resource "aws_api_gateway_method" "create_group" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.create_group.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

# テーマ取得メソッド
resource "aws_api_gateway_method" "get_themes" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.get_themes.id
  http_method   = "GET"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

# グループ招待メソッド
resource "aws_api_gateway_method" "invite_group" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.invite_group.id
  http_method   = "POST"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

# メンバー更新メソッド
resource "aws_api_gateway_method" "update_member" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.update_member.id
  http_method   = "PATCH"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.cognito.id
}

# Lambda関数とAPI Gatewayを統合
# Users周り
# プロフィール更新の統合
resource "aws_api_gateway_integration" "profile" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.profile.id
  http_method             = aws_api_gateway_method.profile.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_update_profile_arn}/invocations"
}

# 初回ログインチェックの統合
resource "aws_api_gateway_integration" "first_login_check" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.first_login_check.id
  http_method             = aws_api_gateway_method.first_login_check.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_first_login_check_arn}/invocations"
}

# ホーム画面で取得するユーザーデータの統合
resource "aws_api_gateway_integration" "home" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.home.id
  http_method             = aws_api_gateway_method.home.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_get_home_data_arn}/invocations"
}

# ユーザー検索の統合
resource "aws_api_gateway_integration" "search" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.search.id
  http_method             = aws_api_gateway_method.search.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_search_users_arn}/invocations"
}

# Groups周り
# グループ作成の統合
resource "aws_api_gateway_integration" "create_group" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.create_group.id
  http_method             = aws_api_gateway_method.create_group.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_create_group_arn}/invocations"
}

# テーマ取得の統合
resource "aws_api_gateway_integration" "get_themes" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.get_themes.id
  http_method             = aws_api_gateway_method.get_themes.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_get_themes_arn}/invocations"
}

# グループ招待の統合
resource "aws_api_gateway_integration" "invite_group" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.invite_group.id
  http_method             = aws_api_gateway_method.invite_group.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_invite_group_arn}/invocations"
}

# メンバー更新の統合
resource "aws_api_gateway_integration" "update_member" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.update_member.id
  http_method             = aws_api_gateway_method.update_member.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_update_member_arn}/invocations"
}

# CORS設定用のOPTIONSメソッド 
# Users周り
# プロフィール更新用
resource "aws_api_gateway_method" "profile_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.profile.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# 初回ログインチェック用
resource "aws_api_gateway_method" "first_login_check_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.first_login_check.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# ホームデータ取得用
resource "aws_api_gateway_method" "home_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.home.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# ユーザー検索用
resource "aws_api_gateway_method" "search_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.search.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# グループ周り
# グループ作成用
resource "aws_api_gateway_method" "create_group_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.create_group.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# テーマ取得用
resource "aws_api_gateway_method" "get_themes_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.get_themes.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# グループ招待用
resource "aws_api_gateway_method" "invite_group_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.invite_group.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# メンバー更新用
resource "aws_api_gateway_method" "update_member_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.update_member.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# OPTIONSメソッドのモック統合 - プロフィール更新用
resource "aws_api_gateway_integration" "profile_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.profile.id
  http_method   = aws_api_gateway_method.profile_options.http_method
  type          = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

# OPTIONSメソッドのモック統合 - 初回ログインチェック用
resource "aws_api_gateway_integration" "first_login_check_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.first_login_check.id
  http_method   = aws_api_gateway_method.first_login_check_options.http_method
  type          = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

# OPTIONSメソッドのモック統合 - ホームデータ取得用
resource "aws_api_gateway_integration" "home_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.home.id
  http_method   = aws_api_gateway_method.home_options.http_method
  type          = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

# OPTIONSメソッドのモック統合 - ユーザー検索用
resource "aws_api_gateway_integration" "search_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.search.id
  http_method   = aws_api_gateway_method.search_options.http_method
  type          = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

# OPTIONSメソッドのモック統合 - グループ作成用
resource "aws_api_gateway_integration" "create_group_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.create_group.id
  http_method   = aws_api_gateway_method.create_group_options.http_method
  type          = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

# OPTIONSメソッドのモック統合 - テーマ取得用
resource "aws_api_gateway_integration" "get_themes_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.get_themes.id
  http_method   = aws_api_gateway_method.get_themes_options.http_method
  type          = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

# OPTIONSメソッドのモック統合 - グループ招待用
resource "aws_api_gateway_integration" "invite_group_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.invite_group.id
  http_method   = aws_api_gateway_method.invite_group_options.http_method
  type          = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

# OPTIONSメソッドのモック統合 - メンバー更新用
resource "aws_api_gateway_integration" "update_member_options" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.update_member.id
  http_method   = aws_api_gateway_method.update_member_options.http_method
  type          = "MOCK"
  request_templates = {
    "application/json" = jsonencode({
      statusCode = 200
    })
  }
}

# メソッドレスポンスの設定 - プロフィール更新用
resource "aws_api_gateway_method_response" "profile_options_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.profile.id
  http_method   = aws_api_gateway_method.profile_options.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# メソッドレスポンスの設定 - 初回ログインチェック用
resource "aws_api_gateway_method_response" "first_login_check_options_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.first_login_check.id
  http_method   = aws_api_gateway_method.first_login_check_options.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# メソッドレスポンスの設定 - ホームデータ取得用
resource "aws_api_gateway_method_response" "home_options_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.home.id
  http_method   = aws_api_gateway_method.home_options.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# メソッドレスポンスの設定 - ユーザー検索用
resource "aws_api_gateway_method_response" "search_options_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.search.id
  http_method   = aws_api_gateway_method.search_options.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# メソッドレスポンスの設定 - グループ作成用
resource "aws_api_gateway_method_response" "create_group_options_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.create_group.id
  http_method   = aws_api_gateway_method.create_group_options.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# メソッドレスポンスの設定 - テーマ取得用
resource "aws_api_gateway_method_response" "get_themes_options_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.get_themes.id
  http_method   = aws_api_gateway_method.get_themes_options.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# メソッドレスポンスの設定 - グループ招待用
resource "aws_api_gateway_method_response" "invite_group_options_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.invite_group.id
  http_method   = aws_api_gateway_method.invite_group_options.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# メソッドレスポンスの設定 - メンバー更新用
resource "aws_api_gateway_method_response" "update_member_options_200" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.update_member.id
  http_method   = aws_api_gateway_method.update_member_options.http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
} 

# 統合レスポンスの設定 - プロフィール更新用
resource "aws_api_gateway_integration_response" "profile_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.profile.id
  http_method   = aws_api_gateway_method.profile_options.http_method
  status_code   = aws_api_gateway_method_response.profile_options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.profile_options]
}

# 統合レスポンスの設定 - 初回ログインチェック用
resource "aws_api_gateway_integration_response" "first_login_check_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.first_login_check.id
  http_method   = aws_api_gateway_method.first_login_check_options.http_method
  status_code   = aws_api_gateway_method_response.first_login_check_options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.first_login_check_options]
}

# 統合レスポンスの設定 - ホームデータ取得用
resource "aws_api_gateway_integration_response" "home_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.home.id
  http_method   = aws_api_gateway_method.home_options.http_method
  status_code   = aws_api_gateway_method_response.home_options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.home_options]
}

# 統合レスポンスの設定 - ユーザー検索用
resource "aws_api_gateway_integration_response" "search_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.search.id
  http_method   = aws_api_gateway_method.search_options.http_method
  status_code   = aws_api_gateway_method_response.search_options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.search_options]
}

# 統合レスポンスの設定 - グループ作成用
resource "aws_api_gateway_integration_response" "create_group_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.create_group.id
  http_method   = aws_api_gateway_method.create_group_options.http_method
  status_code   = aws_api_gateway_method_response.create_group_options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.create_group_options]
}

# 統合レスポンスの設定 - テーマ取得用
resource "aws_api_gateway_integration_response" "get_themes_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.get_themes.id
  http_method   = aws_api_gateway_method.get_themes_options.http_method
  status_code   = aws_api_gateway_method_response.get_themes_options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.get_themes_options]
}

# 統合レスポンスの設定 - グループ招待用
resource "aws_api_gateway_integration_response" "invite_group_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.invite_group.id
  http_method   = aws_api_gateway_method.invite_group_options.http_method
  status_code   = aws_api_gateway_method_response.invite_group_options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.invite_group_options]
}

# 統合レスポンスの設定 - メンバー更新用
resource "aws_api_gateway_integration_response" "update_member_options_integration_response" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.update_member.id
  http_method   = aws_api_gateway_method.update_member_options.http_method
  status_code   = aws_api_gateway_method_response.update_member_options_200.status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,OPTIONS,POST,PUT,PATCH,DELETE'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  depends_on = [aws_api_gateway_integration.update_member_options]
}

# デプロイメント
# リソースIDをまとめて管理
locals {
  # ユーザー関連のリソース
  user_resources = [
    aws_api_gateway_resource.profile.id,
    aws_api_gateway_resource.first_login_check.id,
    aws_api_gateway_resource.home.id,
    aws_api_gateway_resource.search.id
  ]
  
  # グループ関連のリソース
  group_resources = [
    aws_api_gateway_resource.create_group.id,
    aws_api_gateway_resource.get_themes.id, 
    aws_api_gateway_resource.invite_group.id,
    aws_api_gateway_resource.update_member.id
  ]
  
  # 通常のAPIメソッド
  api_methods = [
    aws_api_gateway_method.profile.id,
    aws_api_gateway_method.first_login_check.id,
    aws_api_gateway_method.home.id,
    aws_api_gateway_method.search.id,
    aws_api_gateway_method.create_group.id,
    aws_api_gateway_method.get_themes.id,
    aws_api_gateway_method.invite_group.id,
    aws_api_gateway_method.update_member.id
  ]
  
  # OPTIONSメソッド
  options_methods = [
    aws_api_gateway_method.profile_options.id,
    aws_api_gateway_method.first_login_check_options.id,
    aws_api_gateway_method.home_options.id,
    aws_api_gateway_method.search_options.id,
    aws_api_gateway_method.create_group_options.id,
    aws_api_gateway_method.get_themes_options.id,
    aws_api_gateway_method.invite_group_options.id,
    aws_api_gateway_method.update_member_options.id
  ]
  
  # 通常の統合
  api_integrations = [
    aws_api_gateway_integration.profile.id,
    aws_api_gateway_integration.first_login_check.id,
    aws_api_gateway_integration.home.id,
    aws_api_gateway_integration.search.id,
    aws_api_gateway_integration.create_group.id,
    aws_api_gateway_integration.get_themes.id,
    aws_api_gateway_integration.invite_group.id,
    aws_api_gateway_integration.update_member.id
  ]
  
  # OPTIONSの統合
  options_integrations = [
    aws_api_gateway_integration.profile_options.id,
    aws_api_gateway_integration.first_login_check_options.id,
    aws_api_gateway_integration.home_options.id,
    aws_api_gateway_integration.search_options.id,
    aws_api_gateway_integration.create_group_options.id,
    aws_api_gateway_integration.get_themes_options.id,
    aws_api_gateway_integration.invite_group_options.id,
    aws_api_gateway_integration.update_member_options.id
  ]
  
  # すべてのリソースを結合（トリガー用）
  all_resources = concat(
    local.user_resources,
    local.group_resources,
    local.api_methods,
    local.options_methods,
    local.api_integrations,
    local.options_integrations
  )
}

# デプロイメント
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    # すべてのリソースの組み合わせをハッシュ化
    redeployment = sha1(jsonencode(local.all_resources))
  }

  depends_on = [
    # カテゴリごとに依存関係を指定
    aws_api_gateway_integration.profile,
    aws_api_gateway_integration.first_login_check,
    aws_api_gateway_integration.home,
    aws_api_gateway_integration.search,
    aws_api_gateway_integration.create_group,
    aws_api_gateway_integration.get_themes,
    aws_api_gateway_integration.invite_group,
    aws_api_gateway_integration.update_member,
    # CORS統合レスポンス
    aws_api_gateway_integration_response.profile_options_integration_response,
    aws_api_gateway_integration_response.first_login_check_options_integration_response,
    aws_api_gateway_integration_response.home_options_integration_response,
    aws_api_gateway_integration_response.search_options_integration_response,
    aws_api_gateway_integration_response.create_group_options_integration_response,
    aws_api_gateway_integration_response.get_themes_options_integration_response,
    aws_api_gateway_integration_response.invite_group_options_integration_response,
    aws_api_gateway_integration_response.update_member_options_integration_response
  ]

  lifecycle {
    create_before_destroy = true
  }
}
# ステージ
resource "aws_api_gateway_stage" "api_stage" {
  deployment_id = aws_api_gateway_deployment.api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "dev"
}

# API GatewayのLambda関数へのアクセス権限を追加
# Users周り
resource "aws_lambda_permission" "update_profile_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "update_profile"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "first_login_check_permission" {
  statement_id  = "AllowAPIGatewayInvoke_FirstLoginCheck"
  action        = "lambda:InvokeFunction"
  function_name = "first_login_check"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "get_home_data_permission" {
  statement_id  = "AllowAPIGatewayInvoke_GetHomeData"
  action        = "lambda:InvokeFunction"
  function_name = "get_home_data"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "search_users_permission" {
  statement_id  = "AllowAPIGatewayInvoke_SearchUsers"
  action        = "lambda:InvokeFunction"
  function_name = "search_users"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

# Groups周り
resource "aws_lambda_permission" "create_group_permission" {
  statement_id  = "AllowAPIGatewayInvoke_CreateGroup"
  action        = "lambda:InvokeFunction"
  function_name = "create_group"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "get_themes_permission" {
  statement_id  = "AllowAPIGatewayInvoke_GetThemes"
  action        = "lambda:InvokeFunction"
  function_name = "get_themes"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "invite_group_permission" {
  statement_id  = "AllowAPIGatewayInvoke_InviteGroup"
  action        = "lambda:InvokeFunction"
  function_name = "invite_group"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

resource "aws_lambda_permission" "update_member_permission" {
  statement_id  = "AllowAPIGatewayInvoke_UpdateMember"
  action        = "lambda:InvokeFunction"
  function_name = "update_member"
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

# API GatewayのURLを出力
output "api_gateway_url" {
  value = "${aws_api_gateway_stage.api_stage.invoke_url}"
}
