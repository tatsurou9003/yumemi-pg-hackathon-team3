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
        "arn:aws:dynamodb:*:*:table/ws-connections",
        "arn:aws:dynamodb:*:*:table/*/index/*"
      ]
    }
  ]
}
EOF
}

# Lambda実行ロールにS3権限を追加
resource "aws_iam_policy" "lambda_s3_policy" {
  name   = "lambda-s3-policy"
  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::${var.group_images_bucket_name}/*"
    }
  ]
}
EOF
}

# Lambda実行ロールにAPI Gatewayへのアクセス権限を追加
resource "aws_iam_policy" "lambda_api_gateway_policy" {
  name   = "lambda-apigateway-policy"
  description = "IAM policy for Lambda to access Management API Gateway"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "execute-api:ManageConnections"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:execute-api:*:*:*/*"
      }
    ]
  })
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

resource "aws_iam_role_policy_attachment" "lambda_management_api_gateway" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_api_gateway_policy.arn
}

resource "aws_iam_role_policy_attachment" "lambda_s3" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = aws_iam_policy.lambda_s3_policy.arn
}

# Lambda関数のzipファイル/パスを定義
# Users
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

#Groups
data "archive_file" "create_group_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/groups/create_group.py"
  output_path = "${path.module}/functions/zip/create_group.zip"
}

data "archive_file" "get_themes_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/groups/get_themes.py"
  output_path = "${path.module}/functions/zip/get_themes.zip"
}

data "archive_file" "invite_group_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/groups/invite_group.py"
  output_path = "${path.module}/functions/zip/invite_group.zip"
}

data "archive_file" "update_member_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/groups/update_member.py"
  output_path = "${path.module}/functions/zip/update_member.zip"
}

data "archive_file" "get_history_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/groups/get_history.py"
  output_path = "${path.module}/functions/zip/get_history.zip"
}

# Answers
data "archive_file" "answer_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/answers/answer.py"
  output_path = "${path.module}/functions/zip/answer.zip"
}

data "archive_file" "get_answers_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/answers/get_answers.py"
  output_path = "${path.module}/functions/zip/get_answers.zip"
}

# Likes
data "archive_file" "like_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/likes/like.py"
  output_path = "${path.module}/functions/zip/like.zip"
}

# WebSocket
data "archive_file" "websocket_connect_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/websocket/connect.py"
  output_path = "${path.module}/functions/zip/websocket_connect.zip"
}

data "archive_file" "websocket_disconnect_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/websocket/disconnect.py"
  output_path = "${path.module}/functions/zip/websocket_disconnect.zip"
}

data "archive_file" "websocket_send_message_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/websocket/send_message.py"
  output_path = "${path.module}/functions/zip/websocket_send_message.zip"
}

# Winner
data "archive_file" "decide_winner_zip" {
  type        = "zip"
  source_file = "${path.module}/functions/winner/decide_winner.py"
  output_path = "${path.module}/functions/zip/decide_winner.zip"
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

# CreateGroupトリガーを追加
resource "aws_lambda_function" "create_group" {
  filename = data.archive_file.create_group_zip.output_path
  function_name = "create_group"
  role = aws_iam_role.lambda_exec.arn
  handler = "create_group.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.create_group_zip.output_base64sha256
}

# GetThemesトリガーを追加
resource "aws_lambda_function" "get_themes" {
  filename = data.archive_file.get_themes_zip.output_path
  function_name = "get_themes"
  role = aws_iam_role.lambda_exec.arn
  handler = "get_themes.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.get_themes_zip.output_base64sha256
}

# GetHistoryトリガーを追加
resource "aws_lambda_function" "get_history" {
  filename = data.archive_file.get_history_zip.output_path
  function_name = "get_history"
  role = aws_iam_role.lambda_exec.arn
  handler = "get_history.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.get_history_zip.output_base64sha256
}

# InviteGroupトリガーを追加
resource "aws_lambda_function" "invite_group" {
  filename = data.archive_file.invite_group_zip.output_path
  function_name = "invite_group"
  role = aws_iam_role.lambda_exec.arn
  handler = "invite_group.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.invite_group_zip.output_base64sha256
}

# UpdateMemberトリガーを追加
resource "aws_lambda_function" "update_member" {
  filename = data.archive_file.update_member_zip.output_path
  function_name = "update_member"
  role = aws_iam_role.lambda_exec.arn
  handler = "update_member.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.update_member_zip.output_base64sha256
}

# Answerトリガーを追加
resource "aws_lambda_function" "answer" {
  filename = data.archive_file.answer_zip.output_path
  function_name = "answer"
  role = aws_iam_role.lambda_exec.arn
  handler = "answer.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.answer_zip.output_base64sha256
}

# GetAnswersトリガーを追加
resource "aws_lambda_function" "get_answers" {
  filename = data.archive_file.get_answers_zip.output_path
  function_name = "get_answers"
  role = aws_iam_role.lambda_exec.arn
  handler = "get_answers.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.get_answers_zip.output_base64sha256
}

# Likeトリガーを追加
resource "aws_lambda_function" "like" {
  filename = data.archive_file.like_zip.output_path
  function_name = "like"
  role = aws_iam_role.lambda_exec.arn
  handler = "like.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.like_zip.output_base64sha256
}

# WebSocketトリガーを追加
resource "aws_lambda_function" "websocket_connect" {
  filename = data.archive_file.websocket_connect_zip.output_path
  function_name = "connect"
  role = aws_iam_role.lambda_exec.arn
  handler = "connect.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.websocket_connect_zip.output_base64sha256
}

resource "aws_lambda_function" "websocket_disconnect" {
  filename = data.archive_file.websocket_disconnect_zip.output_path
  function_name = "disconnect"
  role = aws_iam_role.lambda_exec.arn
  handler = "disconnect.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.websocket_disconnect_zip.output_base64sha256
}

resource "aws_lambda_function" "websocket_send_message" {
  filename = data.archive_file.websocket_send_message_zip.output_path
  function_name = "send_message"
  role = aws_iam_role.lambda_exec.arn
  handler = "send_message.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.websocket_send_message_zip.output_base64sha256
}

# Winnerトリガーを追加
resource "aws_lambda_function" "decide_winner" {
  filename = data.archive_file.decide_winner_zip.output_path
  function_name = "decide_winner"
  role = aws_iam_role.lambda_exec.arn
  handler = "decide_winner.lambda_handler"
  runtime = "python3.10"
  source_code_hash = data.archive_file.decide_winner_zip.output_base64sha256
}

# lambda関数のarnを出力
# Users
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

# Groups
output "lambda_create_group_arn" {
  value = aws_lambda_function.create_group.arn
}

output "lambda_get_themes_arn" {
  value = aws_lambda_function.get_themes.arn
}

output "lambda_invite_group_arn" {
  value = aws_lambda_function.invite_group.arn
}

output "lambda_update_member_arn" {
  value = aws_lambda_function.update_member.arn
}

output "lambda_get_history_arn" {
  value = aws_lambda_function.get_history.arn
}

# Answers
output "lambda_answer_arn" {
  value = aws_lambda_function.answer.arn
}

# Likes
output "lambda_like_arn" {
  value = aws_lambda_function.like.arn
}

output "lambda_get_answers_arn" {
  value = aws_lambda_function.get_answers.arn
}

# WebSocket
output "lambda_connect_arn" {
  value = aws_lambda_function.websocket_connect.arn
}

output "lambda_disconnect_arn" {
  value = aws_lambda_function.websocket_disconnect.arn
}

output "lambda_send_message_arn" {
  value = aws_lambda_function.websocket_send_message.arn
}

# Winner
output "lambda_decide_winner_arn" {
  value = aws_lambda_function.decide_winner.arn
}