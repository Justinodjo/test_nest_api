'use strict';

const {
  Controller, Post, Get, Body, UseGuards, Request, HttpCode, HttpStatus,
} = require('@nestjs/common');
const { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } = require('@nestjs/swagger');
const { AuthService } = require('./auth.service');
const { LoginDto, AuthResponseDto } = require('./dto/auth.dto');
const { JwtAuthGuard } = require('../common/guards/jwt-auth.guard');
const { UserResponseDto } = require('../users/dto/user.dto');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(dto) {
    return this.authService.login(dto);
  }

  async getProfile(req) {
    return this.authService.getProfile(req.user.id);
  }
}

// ─── Décorateurs de classe ────────────────────────────────────────────────────
Controller('auth')(AuthController);
ApiTags('Auth')(AuthController);

// ─── POST /auth/login ─────────────────────────────────────────────────────────
Post('login')(AuthController.prototype, 'login', Object.getOwnPropertyDescriptor(AuthController.prototype, 'login'));
HttpCode(HttpStatus.OK)(AuthController.prototype, 'login', Object.getOwnPropertyDescriptor(AuthController.prototype, 'login'));
ApiOperation({ summary: 'Connexion et obtention du JWT' })(AuthController.prototype, 'login', Object.getOwnPropertyDescriptor(AuthController.prototype, 'login'));
ApiResponse({ status: 200, description: 'Connexion réussie', type: AuthResponseDto })(AuthController.prototype, 'login', Object.getOwnPropertyDescriptor(AuthController.prototype, 'login'));
ApiResponse({ status: 401, description: 'Identifiants invalides' })(AuthController.prototype, 'login', Object.getOwnPropertyDescriptor(AuthController.prototype, 'login'));
Body()(AuthController.prototype, 'login', 0);
Reflect.defineMetadata('design:paramtypes', [LoginDto], AuthController.prototype, 'login');

// ─── GET /auth/me ─────────────────────────────────────────────────────────────
Get('me')(AuthController.prototype, 'getProfile', Object.getOwnPropertyDescriptor(AuthController.prototype, 'getProfile'));
UseGuards(JwtAuthGuard)(AuthController.prototype, 'getProfile', Object.getOwnPropertyDescriptor(AuthController.prototype, 'getProfile'));
ApiBearerAuth('JWT-auth')(AuthController.prototype, 'getProfile', Object.getOwnPropertyDescriptor(AuthController.prototype, 'getProfile'));
ApiOperation({ summary: 'Récupérer son profil connecté' })(AuthController.prototype, 'getProfile', Object.getOwnPropertyDescriptor(AuthController.prototype, 'getProfile'));
ApiResponse({ status: 200, type: UserResponseDto })(AuthController.prototype, 'getProfile', Object.getOwnPropertyDescriptor(AuthController.prototype, 'getProfile'));
ApiResponse({ status: 401, description: 'Non authentifié' })(AuthController.prototype, 'getProfile', Object.getOwnPropertyDescriptor(AuthController.prototype, 'getProfile'));
Request()(AuthController.prototype, 'getProfile', 0);

module.exports = { AuthController };
