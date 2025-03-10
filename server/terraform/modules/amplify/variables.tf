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