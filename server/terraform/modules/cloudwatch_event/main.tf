# 5分ごとに実行するCloudWatch Eventsルール
resource "aws_cloudwatch_event_rule" "every_five_minutes" {
  name                = "every-five-minutes"
  description         = "Triggers every five minutes"
  schedule_expression = "rate(5 minutes)"
}

# CloudWatch EventsルールとLambda関数の関連付け
resource "aws_cloudwatch_event_target" "check_theme_deadlines" {
  rule      = aws_cloudwatch_event_rule.every_five_minutes.name
  target_id = "DecideWinner"
  arn       = var.lambda_decide_winner_arn
}

# CloudWatch EventsからLambda関数を呼び出す権限
resource "aws_lambda_permission" "allow_cloudwatch_to_call_decide_winner" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = "decide_winner"
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.every_five_minutes.arn
}