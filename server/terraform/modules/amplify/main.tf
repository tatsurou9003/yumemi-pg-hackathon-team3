resource "aws_amplify_app" "react_app" {
  name         = var.amplify_app_name
  repository   = var.repository_url
  access_token = var.access_token
  platform     = "WEB"
  build_spec   = <<EOF
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd client
        - nvm install 20.18.3
        - nvm use 20.18.3
        - npm install
        - rm -f .env
        - echo "VITE_USER_POOL_ID=$VITE_USER_POOL_ID" > .env
        - echo "VITE_USER_POOL_CLIENT_ID=$VITE_USER_POOL_CLIENT_ID" >> .env
        - echo "VITE_API_URL=$VITE_API_URL" >> .env
        - echo "VITE_WS_API_URL=$VITE_WS_API_URL" >> .env
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: client/dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
  environment:
    NPM_CONFIG_PRODUCTION: false
EOF
}

resource "aws_amplify_branch" "main_branch" {
  app_id      = aws_amplify_app.react_app.id
  branch_name = "main"
  framework   = "React"

  enable_auto_build = true
  enable_basic_auth = false

  environment_variables = {
    "DUMMY_VAR"               = "unused"
    "VITE_USER_POOL_ID"       = var.user_pool_id
    "VITE_USER_POOL_CLIENT_ID" = var.user_pool_client_id
    "VITE_API_URL"            = var.api_url
    "VITE_WS_API_URL"         = var.ws_api_url
  }
}
