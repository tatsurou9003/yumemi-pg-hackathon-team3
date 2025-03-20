terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
    archive = {
      source  = "hashicorp/archive"
      version = ">= 2.0.0"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = var.aws_region
}

module "amplify" {
  source         = "./modules/amplify"
  amplify_app_name  = var.amplify_app_name
  repository_url = var.repository_url
  access_token   = var.access_token
}

module "lambda" {
  source               = "./modules/lambda"
  lambda_function_name = "my_lambda"
}

module "api_gateway" {
  source              = "./modules/api_gateway"
  aws_region          = var.aws_region
  api_gateway_name    = "MyAPIGateway"
  lambda_function_arn = module.lambda.lambda_function_arn
  lambda_function_name = module.lambda.lambda_function_name
  cognito_user_pool_arn = module.cognito.user_pool_arn
}

module "dynamodb" {
  aws_region = var.aws_region
  source = "./modules/dynamodb"
}

module "cognito" {
  source = "./modules/cognito"
  cognito_user_pool_name = var.cognito_user_pool_name
  post_confirmation_lambda_arn = module.lambda.post_confirmation_lambda_arn
}

output "api_gateway_url" {
  value = module.api_gateway.api_gateway_url
}
