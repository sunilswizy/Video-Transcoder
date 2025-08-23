terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_key_pair" "sunil" {
  key_name   = "sunil"
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_security_group" "backend_sg" {
  name        = "backend-sg"
  description = "Allow SSH, HTTP, and HTTPS"
  vpc_id      = "vpc-0c4431fd454954381"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "backend-sg"
  }
}

resource "aws_instance" "backend_instance" {
  ami           = "ami-0360c520857e3138f"
  instance_type = "t2.micro"
  key_name      = aws_key_pair.sunil.key_name

  vpc_security_group_ids = [aws_security_group.backend_sg.id]

  tags = {
    Name = "backend-instance"
  }
}
