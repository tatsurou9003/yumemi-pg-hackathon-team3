resource "aws_cognito_user_pool" "user_pool" {
  name = var.cognito_user_pool_name
  
  username_attributes = ["email"]

  # メールアドレスの自動検証を有効
  auto_verified_attributes = ["email"]

  # MFA（多要素認証）はオフ
  mfa_configuration = "OFF"

  # メール送信設定
  lambda_config {
    post_confirmation = var.post_confirmation_lambda_arn
  }

  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = false
    require_uppercase = false
  }
  
  tags = {
    Project = "Wa-Life"
  }
}

# Cognito User Pool Client の作成
resource "aws_cognito_user_pool_client" "user_pool_client" {
  name         = "${var.cognito_user_pool_name}-client"
  user_pool_id = aws_cognito_user_pool.user_pool.id

  # 明示的認証フローのみを有効化（OAuth 関連のフローは無効）
  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
  ]
}

output "user_pool_id" {
  value = aws_cognito_user_pool.user_pool.id
}
output "user_pool_arn" {
  value       = aws_cognito_user_pool.user_pool.arn
}

output "user_pool_client_id" {
  value = aws_cognito_user_pool_client.user_pool_client.id
}

