resource "aws_s3_bucket" "group_images" {
  bucket = "wa-live-images-bucket-${random_string.bucket_suffix.result}"
  force_destroy = true  # 開発環境用。本番環境ではfalseに変更する
}

resource "random_string" "bucket_suffix" {
  length  = 8
  special = false
  upper   = false
}

# CORS設定
resource "aws_s3_bucket_cors_configuration" "group_images_cors" {
  bucket = aws_s3_bucket.group_images.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "PUT", "POST", "DELETE"]
    allowed_origins = ["*"]  # 本番環境では特定のオリジンに制限する
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# バケットポリシー
resource "aws_s3_bucket_policy" "allow_public_read" {
  bucket = aws_s3_bucket.group_images.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.group_images.arn}/*"
      }
    ]
  })

  depends_on = [aws_s3_bucket_public_access_block.group_images_public_access]
}

# パブリックアクセス設定
resource "aws_s3_bucket_public_access_block" "group_images_public_access" {
  bucket = aws_s3_bucket.group_images.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

output "group_images_bucket_name" {
  value = aws_s3_bucket.group_images.bucket
}