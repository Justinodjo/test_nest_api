"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseDto = exports.LoginDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class LoginDto {
    email;
    password;
}
exports.LoginDto = LoginDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'admin@example.com', description: 'Adresse email' }),
    (0, class_validator_1.IsEmail)({}, { message: "L'email doit être valide" }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Admin@1234', description: 'Mot de passe' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
class AuthResponseDto {
    access_token;
    token_type;
    expires_in;
    user;
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'JWT Access Token' }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Type de token', example: 'Bearer' }),
    __metadata("design:type", String)
], AuthResponseDto.prototype, "token_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Durée de validité en secondes", example: 3600 }),
    __metadata("design:type", Number)
], AuthResponseDto.prototype, "expires_in", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Informations utilisateur' }),
    __metadata("design:type", Object)
], AuthResponseDto.prototype, "user", void 0);
//# sourceMappingURL=auth.dto.js.map