# IAMロールの作成
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

resource "aws_iam_policy" "lambda_dynamodb_policy" {
  name        = "lambda_dynamodb_policy"
  description = "IAM policy for Lambda to access DynamoDB"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem",
        "dynamodb:DeleteItem",
        "dynamodb:BatchGetItem",
        "dynamodb:BatchWriteItem",
        "dynamodb:Query",
        "dynamodb:Scan"
      ],
      "Resource": [
        "arn:aws:dynamodb:*:*:table/users",
        "arn:aws:dynamodb:*:*:table/groups",
        "arn:aws:dynamodb:*:*:table/group_members",
        "arn:aws:dynamodb:*:*:table/messages",
        "arn:aws:dynamodb:*:*:table/answers",
        "arn:aws:dynamodb:*:*:table/likes",
        "arn:aws:dynamodb:*:*:table/*/index/*"
      ]
    }
  ]
}
EOF
}

# Lambdaロールにポリシーをアタッチ
resource "aws_iam_policy_attachment" "lambda_logs" {
  name       = "lambda_logs"
  roles      = [aws_iam_role.lambda_exec.name]
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_role_policy_attachment" "lambda_dynamodb" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_dynamodb_policy.arn
}

# Lambda関数のzipファイル/パスを定義
data "archive_file" "update_profile_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/users/update_profile.py"
  output_path = "${path.module}/functions/zip/lambda_handler.zip"
}

data "archive_file" "post_confirmation_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/users/post_confirmation.py"
  output_path = "${path.module}/functions/zip/post_confirmation.zip"
}

data "archive_file" "first_login_check_zip" {
  type        = "zip"
  source_file  = "${path.module}/functions/users/first_login_check.py"
  output_path = "${path.module}/functions/zip/first_login_check.zip"
}

data "archive_file" "get_home_data_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/users/get_home_data.py"
  output_path = "${path.module}/functions/zip/get_home_data.zip"
}

data "archive_file" "search_users_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/users/search_users.py"
  output_path = "${path.module}/functions/zip/search_users.zip"
}

# Lambda関数の作成
# UpdateProfileトリガーを追加
resource "aws_lambda_function" "update_profile" {
  filename         = data.archive_file.update_profile_zip.output_path
  function_name    = "update_profile"
  role            = aws_iam_role.lambda_exec.arn
  handler        = "update_profile.lambda_handler"
  runtime        = "python3.10"
  source_code_hash = data.archive_file.update_profile_zip.output_base64sha256
}

# PostConfirmationトリガーを追加
resource "aws_lambda_function" "post_confirmation" {
  filename = data.archive_file.post_confirmation_zip.output_path
  function_name = "post_confirmation"
  role = aws_iam_role.lambda_exec.arn
  handler = "post_confirmation.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.post_confirmation_zip.output_base64sha256
}

# FirstLoginCheckトリガーを追加
resource "aws_lambda_function" "first_login_check" {
  filename = data.archive_file.first_login_check_zip.output_path
  function_name = "first_login_check"
  role = aws_iam_role.lambda_exec.arn
  handler = "first_login_check.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.first_login_check_zip.output_base64sha256
}

# GetHomeDataトリガーを追加
resource "aws_lambda_function" "get_home_data" {
  filename = data.archive_file.get_home_data_zip.output_path
  function_name = "get_home_data"
  role = aws_iam_role.lambda_exec.arn
  handler = "get_home_data.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.get_home_data_zip.output_base64sha256
}

# SearchUsersトリガーを追加
resource "aws_lambda_function" "search_users" {
  filename = data.archive_file.search_users_zip.output_path
  function_name = "search_users"
  role = aws_iam_role.lambda_exec.arn
  handler = "search_users.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.search_users_zip.output_base64sha256
}

# lambda関数のarnを出力
output "lambda_update_profile_arn" {
  value = aws_lambda_function.update_profile.arn
}

output "lambda_post_confirmation_arn" {
  value = aws_lambda_function.post_confirmation.arn
}

output "lambda_first_login_check_arn" {
  value = aws_lambda_function.first_login_check.arn
}

output "lambda_get_home_data_arn" {
  value = aws_lambda_function.get_home_data.arn
}

output "lambda_search_users_arn" {
  value = aws_lambda_function.search_users.arn
}
