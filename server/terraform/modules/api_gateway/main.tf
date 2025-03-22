# REST API Gatewayを作成
resource "aws_api_gateway_rest_api" "api" {
  name        = var.api_gateway_name
  description = "REST API Gateway connected to Lambda"
}

# Usersリソースを追加
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
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "home"
}

# ユーザー検索リソース
resource "aws_api_gateway_resource" "search" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "search"
}

# Cognitoオーソライザーを追加
resource "aws_api_gateway_authorizer" "cognito" {
  name          = "cognito-authorizer"
  rest_api_id   = aws_api_gateway_rest_api.api.id
  type          = "COGNITO_USER_POOLS"
  provider_arns = [var.cognito_user_pool_arn]
}

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

# Lambda関数とAPI Gatewayを統合
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


# CORS設定用のOPTIONSメソッド 
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

# デプロイメント
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.profile.id,
      aws_api_gateway_resource.first_login_check.id,
      aws_api_gateway_resource.home.id,
      aws_api_gateway_resource.search.id,
      aws_api_gateway_method.profile.id,
      aws_api_gateway_method.first_login_check.id,
      aws_api_gateway_method.home.id,
      aws_api_gateway_method.search.id,
      aws_api_gateway_method.profile_options.id,
      aws_api_gateway_method.first_login_check_options.id,
      aws_api_gateway_method.home_options.id,
      aws_api_gateway_method.search_options.id,
      aws_api_gateway_integration.profile.id,
      aws_api_gateway_integration.first_login_check.id,
      aws_api_gateway_integration.home.id,
      aws_api_gateway_integration.search.id,
      aws_api_gateway_integration.profile_options.id,
      aws_api_gateway_integration.first_login_check_options.id,
      aws_api_gateway_integration.home_options.id,
      aws_api_gateway_integration.search_options.id
    ]))
  }

  depends_on = [
    aws_api_gateway_method.profile,
    aws_api_gateway_method.first_login_check,
    aws_api_gateway_method.home,
    aws_api_gateway_method.search,
    aws_api_gateway_method.profile_options,
    aws_api_gateway_method.first_login_check_options,
    aws_api_gateway_method.home_options,
    aws_api_gateway_method.search_options,
    aws_api_gateway_integration.profile,
    aws_api_gateway_integration.first_login_check,
    aws_api_gateway_integration.home,
    aws_api_gateway_integration.search,
    aws_api_gateway_integration.profile_options,
    aws_api_gateway_integration.first_login_check_options,
    aws_api_gateway_integration.home_options,
    aws_api_gateway_integration.search_options,
    aws_api_gateway_integration_response.profile_options_integration_response,
    aws_api_gateway_integration_response.first_login_check_options_integration_response,
    aws_api_gateway_integration_response.home_options_integration_response,
    aws_api_gateway_integration_response.search_options_integration_response
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

# API GatewayのURLを出力
output "api_gateway_url" {
  value = "${aws_api_gateway_stage.api_stage.invoke_url}"
}
