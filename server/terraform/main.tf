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
}

output "api_gateway_url" {
  value = module.api_gateway.api_gateway_url
}
