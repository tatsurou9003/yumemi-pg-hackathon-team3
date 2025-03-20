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
data "archive_file" "lambda_handler_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/lambda_handler.py"
  output_path = "${path.module}/lambda_handler.zip"
}

data "archive_file" "post_confirmation_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/post_confirmation.py"
  output_path = "${path.module}/post_confirmation.zip"
}

# Lambda関数の作成
resource "aws_lambda_function" "lambda_function" {
  filename         = data.archive_file.lambda_handler_zip.output_path
  function_name    = var.lambda_function_name
  role            = aws_iam_role.lambda_exec.arn
  handler        = "lambda_handler.lambda_handler"
  runtime        = "python3.10"
  source_code_hash = data.archive_file.lambda_handler_zip.output_base64sha256
}

# PostConfirmationトリガーを追加
resource "aws_lambda_function" "post_confirmation" {
  filename = data.archive_file.post_confirmation_zip.output_path
  function_name = "post_confirmation"
  role = aws_iam_role.lambda_exec.arn
  handler = "post_confirmation.post_confirmation"
  runtime = "python3.10"
  source_code_hash = data.archive_file.post_confirmation_zip.output_base64sha256
}

# lambda関数のarnを出力
output "lambda_function_arn" {
  value = aws_lambda_function.lambda_function.arn
}

output "post_confirmation_lambda_arn" {
  value = aws_lambda_function.post_confirmation.arn
}

output "lambda_function_name" {
  value = aws_lambda_function.lambda_function.function_name
}
