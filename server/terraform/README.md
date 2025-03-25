<!-- BEGIN_TF_DOCS -->
## Requirements

| Name | Version |
|------|---------|
| <a name="requirement_terraform"></a> [terraform](#requirement\_terraform) | >= 1.2.0 |
| <a name="requirement_archive"></a> [archive](#requirement\_archive) | >= 2.0.0 |
| <a name="requirement_aws"></a> [aws](#requirement\_aws) | ~> 4.16 |

## Providers

No providers.

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_amplify"></a> [amplify](#module\_amplify) | ./modules/amplify | n/a |
| <a name="module_api_gateway"></a> [api\_gateway](#module\_api\_gateway) | ./modules/api_gateway | n/a |
| <a name="module_cognito"></a> [cognito](#module\_cognito) | ./modules/cognito | n/a |
| <a name="module_dynamodb"></a> [dynamodb](#module\_dynamodb) | ./modules/dynamodb | n/a |
| <a name="module_lambda"></a> [lambda](#module\_lambda) | ./modules/lambda | n/a |

## Resources

No resources.

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_access_token"></a> [access\_token](#input\_access\_token) | Personal access token | `string` | n/a | yes |
| <a name="input_amplify_app_name"></a> [amplify\_app\_name](#input\_amplify\_app\_name) | Amplifyアプリの名前 | `string` | `"wa-life-app"` | no |
| <a name="input_aws_region"></a> [aws\_region](#input\_aws\_region) | AWS region | `string` | `"ap-northeast-1"` | no |
| <a name="input_cognito_user_pool_name"></a> [cognito\_user\_pool\_name](#input\_cognito\_user\_pool\_name) | Name of the Cognito User Pool | `string` | `"wa-life-user-pool"` | no |
| <a name="input_repository_url"></a> [repository\_url](#input\_repository\_url) | リポジトリURL | `string` | `"https://github.com/tatsurou9003/yumemi-pg-hackathon-team3.git"` | no |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_api_gateway_url"></a> [api\_gateway\_url](#output\_api\_gateway\_url) | n/a |
<!-- END_TF_DOCS -->