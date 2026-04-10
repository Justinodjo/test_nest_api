import { ApiProperty, ApiPropertyOptional, PartialType, OmitType } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'john.doe@example.com', description: "Adresse email de l'utilisateur" })
  @IsEmail({}, { message: "L'email doit être valide" })
  email: string;

  @ApiProperty({ example: 'johndoe', description: "Nom d'utilisateur unique" })
  @IsString()
  @MinLength(3, { message: "Le nom d'utilisateur doit avoir au moins 3 caractères" })
  @MaxLength(30, { message: "Le nom d'utilisateur ne doit pas dépasser 30 caractères" })
  username: string;

  @ApiProperty({ example: 'P@ssw0rd!', description: 'Mot de passe (min 8 caractères)' })
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit avoir au moins 8 caractères' })
  password: string;

  @ApiPropertyOptional({ enum: UserRole, default: UserRole.USER, description: "Rôle de l'utilisateur" })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Le rôle doit être admin ou user' })
  role?: UserRole;
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {
  @ApiPropertyOptional({ example: 'newpassword123', description: 'Nouveau mot de passe' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role: UserRole;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
