variable "aws_region" {
  description = "AWS region for all resources"
  type        = string
  default     = "ap-northeast-1"
}

variable "lambda_connect_arn" {
  description = "ARN of the Lambda function for WebSocket $connect route"
  type        = string
}

variable "lambda_disconnect_arn" {
  description = "ARN of the Lambda function for WebSocket $disconnect route"
  type        = string
}

variable "lambda_send_message_arn" {
  description = "ARN of the Lambda function for WebSocket sendMessage route"
  type        = string
}
