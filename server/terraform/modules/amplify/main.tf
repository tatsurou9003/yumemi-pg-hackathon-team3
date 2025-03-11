resource "aws_amplify_app" "react_app" {
  name       = var.amplify_app_name
  repository = var.repository_url
  access_token = var.access_token
  platform   = "WEB"
  build_spec =  <<EOF
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd client
        - nvm install 20.18.3
        - nvm use 20.18.3
        - npm install
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
    "DUMMY_VAR" = "unused"
  }
}
