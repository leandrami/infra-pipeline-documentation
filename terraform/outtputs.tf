output "instance_id" {
  description = "ID da instância EC2 criada"
  value       = aws_instance.api.id
}

output "instance_public_ip" {
  description = "IP público da instância (no LocalStack costuma vir vazio/fake)"
  value       = aws_instance.api.public_ip
}