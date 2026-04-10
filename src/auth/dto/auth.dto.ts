import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'admin@example.com', description: 'Adresse email' })
  @IsEmail({}, { message: "L'email doit être valide" })
  email: string;

  @ApiProperty({ example: 'Admin@1234', description: 'Mot de passe' })
  @IsString()
  @MinLength(8)
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT Access Token' })
  access_token: string;

  @ApiProperty({ description: 'Type de token', example: 'Bearer' })
  token_type: string;

  @ApiProperty({ description: "Durée de validité en secondes", example: 3600 })
  expires_in: number;

  @ApiProperty({ description: 'Informations utilisateur' })
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
  };
}
