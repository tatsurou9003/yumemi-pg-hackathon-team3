variable "aws_region" {
  description = "AWSリージョン"
  default     = "ap-northeast-1"
}

variable "lambda_function_name" {
  description = "Lambda関数名"
  default     = "my_lambda_function"
}

variable "api_gateway_name" {
  description = "API名"
  default     = "my_api_gateway"
}
