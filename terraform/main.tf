resource "aws_instance" "api" {
  ami           = var.ami_id
  instance_type = var.instance_type

  tags = {
    Name    = var.instance_name
    Project = "desafio-devops-fap"
  }
}