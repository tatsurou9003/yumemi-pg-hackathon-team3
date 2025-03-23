variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "api_gateway_name" {
  type        = string
  description = "Name of the API Gateway"
}

# Users周りのLambda
variable "lambda_update_profile_arn" {
  type        = string
  description = "Lambda function ARN"
}

variable "lambda_first_login_check_arn" {
  type        = string
  description = "Lambda function ARN"
}

variable "lambda_get_home_data_arn" {
  type        = string
  description = "Lambda function ARN"
}

variable "lambda_search_users_arn" {
  type        = string
  description = "Lambda function ARN"
}

# Groups周りのLambda
variable "lambda_create_group_arn" {
  type        = string
  description = "Lambda function ARN"
}

variable "lambda_get_themes_arn" {
  type        = string
  description = "Lambda function ARN"
}

variable "lambda_invite_group_arn" {
  type        = string
  description = "Lambda function ARN"
}

variable "lambda_update_member_arn" {
  type        = string
  description = "Lambda function ARN"
}

# Cognito User Pool
variable "cognito_user_pool_arn" {
  description = "ARN of the Cognito User Pool to use for authentication"
  type        = string
}

