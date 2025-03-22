variable "cognito_user_pool_name" {
  type        = string
  description = "Name of the Cognito User Pool"
}

variable "post_confirmation_lambda_arn" {
  type        = string
  description = "ARN of the Lambda function to call after user confirmation"
}