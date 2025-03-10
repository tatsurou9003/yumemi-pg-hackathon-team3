variable "aws_region" {
  type       = string
  description = "AWS region"
  default     = "ap-northeast-1"
}

variable "amplify_app_name" {
  type        = string
  description = "Amplifyアプリの名前"
}

variable "repository_url" {
  type        = string
  description = "リポジトリURL"
}

variable "access_token" {
  type        = string
  description = "Personal access token"
  sensitive   = true
}
