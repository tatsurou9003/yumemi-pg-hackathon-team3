variable "amplify_app_name" {
  type        = string
  description = "Amplify アプリの名前"
}

variable "repository_url" {
  type        = string
  description = "リポジトリのURL"
}

variable "access_token" {
  type        = string
  description = "Githubのアクセストークン"
  sensitive   = true
}

variable "user_pool_id" {
  description = "Cognito User Pool ID"
  type        = string
}

variable "user_pool_client_id" {
  description = "Cognito User Pool Client ID"
  type        = string
}

variable "api_url" {
  description = "API GatewayのURL"
  type        = string
}

variable "ws_api_url" {
  description = "WebSocket APIのURL"
  type        = string
}