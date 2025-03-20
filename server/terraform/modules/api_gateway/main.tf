# REST API Gatewayを作成
resource "aws_api_gateway_rest_api" "api" {
  name        = var.api_gateway_name
  description = "REST API Gateway connected to Lambda"
}

# リソースを追加
# usersリソース
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

# デプロイメント
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.profile.id,
      aws_api_gateway_resource.first_login_check.id,
      aws_api_gateway_method.profile.id,
      aws_api_gateway_method.first_login_check.id,
      aws_api_gateway_integration.profile.id,
      aws_api_gateway_integration.first_login_check.id
    ]))
  }

  depends_on = [
    aws_api_gateway_method.profile,
    aws_api_gateway_method.first_login_check,
    aws_api_gateway_integration.profile,
    aws_api_gateway_integration.first_login_check
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


# API GatewayのURLを出力
output "api_gateway_url" {
  value = "${aws_api_gateway_stage.api_stage.invoke_url}"
}
