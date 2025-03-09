terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}

# Lambda 用 IAM ロール
resource "aws_iam_role" "lambda_exec" {
  name = "lambda_execution_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

# IAM ポリシーアタッチ
resource "aws_iam_policy_attachment" "lambda_logs" {
  name       = "lambda_logs"
  roles      = [aws_iam_role.lambda_exec.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda 関数の ZIP 作成
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_file = "lambda/lambda_handler.py"
  output_path = "lambda/lambda_function.zip"
}

# Lambda 関数の作成
resource "aws_lambda_function" "lambda_function" {
  filename         = data.archive_file.lambda_zip.output_path
  function_name    = var.lambda_function_name
  role            = aws_iam_role.lambda_exec.arn
  handler        = "lambda_handler.lambda_handler"
  runtime        = "python3.8"
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
}

# API Gateway の作成
resource "aws_api_gateway_rest_api" "api" {
  name        = var.api_gateway_name
  description = "REST API Gateway connected to Lambda"
}

# API Gateway のリソース（/hello）
resource "aws_api_gateway_resource" "hello" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "hello"
}

# API Gateway のメソッド（GET /hello）
resource "aws_api_gateway_method" "hello_get" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.hello.id
  http_method   = "GET"
  authorization = "NONE"
}

# Lambda 統合設定（API Gateway → Lambda）
resource "aws_api_gateway_integration" "lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.hello.id
  http_method             = aws_api_gateway_method.hello_get.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.lambda_function.invoke_arn
}

# API Gateway のデプロイ
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api.id

  triggers = {
    redeployment = sha1(jsonencode({
      "rest_api_id" = aws_api_gateway_rest_api.api.id
      "resource_id" = aws_api_gateway_resource.hello.id
      "http_method" = aws_api_gateway_method.hello_get.http_method
    }))
  }

  depends_on = [
    aws_api_gateway_method.hello_get
  ]

  lifecycle {
    create_before_destroy = true
  }
}

# API Gateway のステージ作成（デフォルト）
resource "aws_api_gateway_stage" "api_stage" {
  deployment_id = aws_api_gateway_deployment.api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  stage_name    = "dev"
}

# API Gatewayに Lambda の実行権限を付与
resource "aws_lambda_permission" "api_gateway_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api.execution_arn}/*/*"
}

# 出力（API Gateway のエンドポイント）
output "api_gateway_url" {
  value = "${aws_api_gateway_stage.api_stage.invoke_url}/hello"
}