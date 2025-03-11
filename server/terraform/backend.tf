terraform {
    backend "s3" {
    bucket         = "walife-tf-state-bucket"
    key            = "terraform.tfstate"
    region         = "ap-northeast-1"
    encrypt        = true
    use_lockfile = true
  }
}