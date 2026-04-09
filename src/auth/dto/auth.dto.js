'use strict';

const { ApiProperty } = require('@nestjs/swagger');
const { IsEmail, IsString, MinLength } = require('class-validator');

class LoginDto {}
Object.defineProperty(LoginDto.prototype, 'email', { writable: true, value: undefined });
Object.defineProperty(LoginDto.prototype, 'password', { writable: true, value: undefined });

ApiProperty({ example: 'admin@example.com', description: 'Adresse email', type: String })(LoginDto.prototype, 'email');
IsEmail({}, { message: "L'email doit être valide" })(LoginDto.prototype, 'email');
ApiProperty({ example: 'Admin@1234', description: 'Mot de passe', type: String })(LoginDto.prototype, 'password');
IsString()(LoginDto.prototype, 'password');
MinLength(8)(LoginDto.prototype, 'password');

class AuthResponseDto {}
Object.defineProperty(AuthResponseDto.prototype, 'access_token', { writable: true, value: undefined });
Object.defineProperty(AuthResponseDto.prototype, 'token_type', { writable: true, value: undefined });
Object.defineProperty(AuthResponseDto.prototype, 'expires_in', { writable: true, value: undefined });
Object.defineProperty(AuthResponseDto.prototype, 'user', { writable: true, value: undefined });

ApiProperty({ description: 'JWT Access Token', type: String })(AuthResponseDto.prototype, 'access_token');
ApiProperty({ example: 'Bearer', type: String })(AuthResponseDto.prototype, 'token_type');
ApiProperty({ example: 3600, type: Number })(AuthResponseDto.prototype, 'expires_in');
ApiProperty({ description: 'Informations utilisateur', type: Object })(AuthResponseDto.prototype, 'user');

module.exports = { LoginDto, AuthResponseDto };
