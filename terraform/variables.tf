variable "aws_region" {
  description = "Região AWS (fake, mas o LocalStack exige uma válida)"
  type        = string
  default     = "us-east-1"
}

variable "localstack_endpoint" {
  description = "Endpoint do LocalStack rodando localmente"
  type        = string
  default     = "http://localhost:4566"
}

variable "instance_name" {
  description = "Nome/tag da instância EC2"
  type        = string
  default     = "api-devops-fap"
}

variable "instance_type" {
  description = "Tipo da instância EC2"
  type        = string
  default     = "t2.micro"
}

variable "ami_id" {
  description = "ID da AMI usada na instância"
  type        = string
  default     = "ami-0c55b159cbfafe1f0"
}