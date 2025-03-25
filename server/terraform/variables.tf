variable "aws_region" {
  type       = string
  description = "AWS region"
  default     = "ap-northeast-1"
}

variable "amplify_app_name" {
  type        = string
  description = "Amplifyアプリの名前"
  default = "wa-life-app"
}

variable "repository_url" {
  type        = string
  description = "リポジトリURL"
  default     = "https://github.com/tatsurou9003/yumemi-pg-hackathon-team3.git"
}

variable "access_token" {
  type        = string
  description = "Personal access token"
  sensitive   = true
}

variable "cognito_user_pool_name" {
  type        = string
  description = "Name of the Cognito User Pool"
  default     = "wa-life-user-pool"
}