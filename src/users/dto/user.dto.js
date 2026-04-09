'use strict';

const { ApiProperty, ApiPropertyOptional } = require('@nestjs/swagger');
const { IsEmail, IsString, MinLength, MaxLength, IsEnum, IsOptional } = require('class-validator');
const { UserRole } = require('../user.entity');

// ─── CreateUserDto ────────────────────────────────────────────────────────────
class CreateUserDto {}
Object.defineProperty(CreateUserDto.prototype, 'email', { writable: true, value: undefined });
Object.defineProperty(CreateUserDto.prototype, 'username', { writable: true, value: undefined });
Object.defineProperty(CreateUserDto.prototype, 'password', { writable: true, value: undefined });
Object.defineProperty(CreateUserDto.prototype, 'role', { writable: true, value: undefined });

ApiProperty({ example: 'john.doe@example.com', description: "Adresse email", type: String })(CreateUserDto.prototype, 'email');
IsEmail({}, { message: "L'email doit être valide" })(CreateUserDto.prototype, 'email');
ApiProperty({ example: 'johndoe', description: "Nom d'utilisateur unique", type: String })(CreateUserDto.prototype, 'username');
IsString()(CreateUserDto.prototype, 'username');
MinLength(3)(CreateUserDto.prototype, 'username');
MaxLength(30)(CreateUserDto.prototype, 'username');
ApiProperty({ example: 'P@ssw0rd!', description: 'Mot de passe (min 8 caractères)', type: String })(CreateUserDto.prototype, 'password');
IsString()(CreateUserDto.prototype, 'password');
MinLength(8)(CreateUserDto.prototype, 'password');
ApiPropertyOptional({ enum: UserRole, default: UserRole.USER, enumName: 'UserRole' })(CreateUserDto.prototype, 'role');
IsOptional()(CreateUserDto.prototype, 'role');
IsEnum(UserRole)(CreateUserDto.prototype, 'role');

// ─── UpdateUserDto ────────────────────────────────────────────────────────────
class UpdateUserDto {}
Object.defineProperty(UpdateUserDto.prototype, 'email', { writable: true, value: undefined });
Object.defineProperty(UpdateUserDto.prototype, 'username', { writable: true, value: undefined });
Object.defineProperty(UpdateUserDto.prototype, 'password', { writable: true, value: undefined });
Object.defineProperty(UpdateUserDto.prototype, 'role', { writable: true, value: undefined });

ApiPropertyOptional({ example: 'new@example.com', type: String })(UpdateUserDto.prototype, 'email');
IsOptional()(UpdateUserDto.prototype, 'email');
IsEmail()(UpdateUserDto.prototype, 'email');
ApiPropertyOptional({ example: 'newusername', type: String })(UpdateUserDto.prototype, 'username');
IsOptional()(UpdateUserDto.prototype, 'username');
IsString()(UpdateUserDto.prototype, 'username');
MinLength(3)(UpdateUserDto.prototype, 'username');
ApiPropertyOptional({ example: 'NewP@ss123', type: String })(UpdateUserDto.prototype, 'password');
IsOptional()(UpdateUserDto.prototype, 'password');
IsString()(UpdateUserDto.prototype, 'password');
MinLength(8)(UpdateUserDto.prototype, 'password');
ApiPropertyOptional({ enum: UserRole, enumName: 'UserRole' })(UpdateUserDto.prototype, 'role');
IsOptional()(UpdateUserDto.prototype, 'role');
IsEnum(UserRole)(UpdateUserDto.prototype, 'role');

// ─── UserResponseDto ──────────────────────────────────────────────────────────
class UserResponseDto {}
Object.defineProperty(UserResponseDto.prototype, 'id', { writable: true, value: undefined });
Object.defineProperty(UserResponseDto.prototype, 'email', { writable: true, value: undefined });
Object.defineProperty(UserResponseDto.prototype, 'username', { writable: true, value: undefined });
Object.defineProperty(UserResponseDto.prototype, 'role', { writable: true, value: undefined });
Object.defineProperty(UserResponseDto.prototype, 'createdAt', { writable: true, value: undefined });
Object.defineProperty(UserResponseDto.prototype, 'updatedAt', { writable: true, value: undefined });

ApiProperty({ example: 1, type: Number })(UserResponseDto.prototype, 'id');
ApiProperty({ example: 'john.doe@example.com', type: String })(UserResponseDto.prototype, 'email');
ApiProperty({ example: 'johndoe', type: String })(UserResponseDto.prototype, 'username');
ApiProperty({ enum: UserRole, example: UserRole.USER, enumName: 'UserRole' })(UserResponseDto.prototype, 'role');
ApiProperty({ type: String })(UserResponseDto.prototype, 'createdAt');
ApiProperty({ type: String })(UserResponseDto.prototype, 'updatedAt');

module.exports = { CreateUserDto, UpdateUserDto, UserResponseDto };
