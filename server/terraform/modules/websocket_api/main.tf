# WebSocket API本体
resource "aws_apigatewayv2_api" "websocket_api" {
  name                       = "wa-life-websocket-api"
  protocol_type              = "WEBSOCKET"
  route_selection_expression = "$request.body.action"
}

# $connect ルート
resource "aws_apigatewayv2_route" "connect" {
  api_id    = aws_apigatewayv2_api.websocket_api.id
  route_key = "$connect"
  target    = "integrations/${aws_apigatewayv2_integration.connect.id}"
}

# $disconnect ルート
resource "aws_apigatewayv2_route" "disconnect" {
  api_id    = aws_apigatewayv2_api.websocket_api.id
  route_key = "$disconnect"
  target    = "integrations/${aws_apigatewayv2_integration.disconnect.id}"
}

# sendMessage ルート
resource "aws_apigatewayv2_route" "send_message" {
  api_id    = aws_apigatewayv2_api.websocket_api.id
  route_key = "sendMessage"
  target    = "integrations/${aws_apigatewayv2_integration.send_message.id}"
}

# $connect Lambda統合
resource "aws_apigatewayv2_integration" "connect" {
  api_id                    = aws_apigatewayv2_api.websocket_api.id
  integration_type          = "AWS_PROXY"
  integration_uri           = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_connect_arn}/invocations"
  content_handling_strategy = "CONVERT_TO_TEXT"
  passthrough_behavior      = "WHEN_NO_MATCH"
}

# $disconnect Lambda統合
resource "aws_apigatewayv2_integration" "disconnect" {
  api_id                    = aws_apigatewayv2_api.websocket_api.id
  integration_type          = "AWS_PROXY"
  integration_uri           = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_disconnect_arn}/invocations"
  content_handling_strategy = "CONVERT_TO_TEXT"
  passthrough_behavior      = "WHEN_NO_MATCH"
}

# sendMessage Lambda統合
resource "aws_apigatewayv2_integration" "send_message" {
  api_id                    = aws_apigatewayv2_api.websocket_api.id
  integration_type          = "AWS_PROXY"
  integration_uri           = "arn:aws:apigateway:${var.aws_region}:lambda:path/2015-03-31/functions/${var.lambda_send_message_arn}/invocations"
  content_handling_strategy = "CONVERT_TO_TEXT"
  passthrough_behavior      = "WHEN_NO_MATCH"
}

# Lambda関数の呼び出し権限（$connect）
resource "aws_lambda_permission" "websocket_connect" {
  statement_id  = "AllowExecutionFromWebSocketConnect"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_connect_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.websocket_api.execution_arn}/$connect"
}

# Lambda関数の呼び出し権限（$disconnect）
resource "aws_lambda_permission" "websocket_disconnect" {
  statement_id  = "AllowExecutionFromWebSocketDisconnect"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_disconnect_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.websocket_api.execution_arn}/$disconnect"
}

# Lambda関数の呼び出し権限（sendMessage）
resource "aws_lambda_permission" "websocket_send_message" {
  statement_id  = "AllowExecutionFromWebSocketSendMessage"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_send_message_arn
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.websocket_api.execution_arn}/sendMessage"
}

# デプロイメント
resource "aws_apigatewayv2_deployment" "websocket_deployment" {
  api_id      = aws_apigatewayv2_api.websocket_api.id
  description = "WebSocket API Deployment"
  
  # すべてのルートとその統合が作成された後にデプロイするために依存関係を設定
  depends_on = [
    aws_apigatewayv2_route.connect,
    aws_apigatewayv2_route.disconnect,
    aws_apigatewayv2_route.send_message
  ]
  
  # 変更があった場合に毎回新しいデプロイメントを作成するためのトリガー
  triggers = {
    redeployment = sha1(jsonencode([
      aws_apigatewayv2_route.connect,
      aws_apigatewayv2_route.disconnect,
      aws_apigatewayv2_route.send_message,
      aws_apigatewayv2_integration.connect,
      aws_apigatewayv2_integration.disconnect,
      aws_apigatewayv2_integration.send_message
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

# ステージ
resource "aws_apigatewayv2_stage" "websocket_stage" {
  api_id        = aws_apigatewayv2_api.websocket_api.id
  name          = "dev"
  deployment_id = aws_apigatewayv2_deployment.websocket_deployment.id
  description   = "Development Stage"
  
  default_route_settings {
    detailed_metrics_enabled = true
    throttling_burst_limit   = 50
    throttling_rate_limit    = 50
  }
}

# 出力値
output "websocket_api_endpoint" {
  value       = "${aws_apigatewayv2_stage.websocket_stage.invoke_url}"
  description = "WebSocket API Endpoint"
}