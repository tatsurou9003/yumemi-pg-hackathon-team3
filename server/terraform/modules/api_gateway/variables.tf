variable "aws_region" {
  type        = string
  description = "AWS region"
}

variable "api_gateway_name" {
  type        = string
  description = "Name of the API Gateway"
}

variable "lambda_function_arn" {
  type        = string
  description = "Lambda function ARN"
}

variable "lambda_function_name" {
  type        = string
  description = "Lambda function name"
}

variable "cognito_user_pool_arn" {
  description = "ARN of the Cognito User Pool to use for authentication"
  type        = string
}

