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
  user_pool_id   = module.cognito.user_pool_id
  user_pool_client_id = module.cognito.user_pool_client_id
}

module "lambda" {
  source               = "./modules/lambda"
}

module "api_gateway" {
  source              = "./modules/api_gateway"
  aws_region          = var.aws_region
  api_gateway_name    = "wa-life-api"
  lambda_update_profile_arn = module.lambda.lambda_update_profile_arn
  lambda_first_login_check_arn = module.lambda.lambda_first_login_check_arn
  lambda_get_home_data_arn = module.lambda.lambda_get_home_data_arn
  lambda_search_users_arn = module.lambda.lambda_search_users_arn
  lambda_create_group_arn = module.lambda.lambda_create_group_arn
  lambda_get_themes_arn = module.lambda.lambda_get_themes_arn
  lambda_invite_group_arn = module.lambda.lambda_invite_group_arn
  lambda_update_member_arn = module.lambda.lambda_update_member_arn
  lambda_get_history_arn = module.lambda.lambda_get_history_arn
  lambda_answer_arn = module.lambda.lambda_answer_arn
  lambda_get_answers_arn = module.lambda.lambda_get_answers_arn
  lambda_like_arn = module.lambda.lambda_like_arn
  cognito_user_pool_arn = module.cognito.cognito_user_pool_arn
}

module "websocket_api" {
  source = "./modules/websocket_api"
  aws_region = var.aws_region
  lambda_connect_arn = module.lambda.lambda_connect_arn
  lambda_disconnect_arn = module.lambda.lambda_disconnect_arn
  lambda_send_message_arn = module.lambda.lambda_send_message_arn
}

module "dynamodb" {
  aws_region = var.aws_region
  source = "./modules/dynamodb"
}

module "cognito" {
  source = "./modules/cognito"
  cognito_user_pool_name = var.cognito_user_pool_name
  post_confirmation_lambda_arn = module.lambda.lambda_post_confirmation_arn
}

module "cloudwatch_event" {
  source = "./modules/cloudwatch_event"
  lambda_decide_winner_arn = module.lambda.lambda_decide_winner_arn
}

output "api_gateway_url" {
  value = module.api_gateway.api_gateway_url
}
