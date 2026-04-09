'use strict';

const {
  Controller, Get, Post, Put, Delete,
  Param, Body, UseGuards, HttpCode, HttpStatus, Request,
} = require('@nestjs/common');
const {
  ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam,
} = require('@nestjs/swagger');
const { UsersService } = require('./users.service');
const { CreateUserDto, UpdateUserDto, UserResponseDto } = require('./dto/user.dto');
const { JwtAuthGuard } = require('../common/guards/jwt-auth.guard');
const { RolesGuard } = require('../common/guards/roles.guard');
const { Roles } = require('../common/decorators/roles.decorator');
const { UserRole } = require('./user.entity');

class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async register(dto) {
    return this.usersService.create(dto);
  }

  async findAll() {
    return this.usersService.findAll();
  }

  async findOne(id) {
    return this.usersService.findOne(Number(id));
  }

  async update(id, dto, req) {
    return this.usersService.update(Number(id), dto, req.user.id, req.user.role);
  }

  async remove(id, req) {
    return this.usersService.remove(Number(id), req.user.id, req.user.role);
  }
}

// ─── Décorateurs de classe ────────────────────────────────────────────────────
Controller('users')(UsersController);
ApiTags('Users')(UsersController);

// ─── POST /users/register ─────────────────────────────────────────────────────
Post('register')(UsersController.prototype, 'register', Object.getOwnPropertyDescriptor(UsersController.prototype, 'register'));
HttpCode(HttpStatus.CREATED)(UsersController.prototype, 'register', Object.getOwnPropertyDescriptor(UsersController.prototype, 'register'));
ApiOperation({ summary: 'Créer un nouveau compte utilisateur' })(UsersController.prototype, 'register', Object.getOwnPropertyDescriptor(UsersController.prototype, 'register'));
ApiResponse({ status: 201, description: 'Utilisateur créé', type: UserResponseDto })(UsersController.prototype, 'register', Object.getOwnPropertyDescriptor(UsersController.prototype, 'register'));
ApiResponse({ status: 409, description: 'Email ou username déjà utilisé' })(UsersController.prototype, 'register', Object.getOwnPropertyDescriptor(UsersController.prototype, 'register'));
Body()(UsersController.prototype, 'register', 0);
// DTO hint for validation
Reflect.defineMetadata('design:paramtypes', [CreateUserDto], UsersController.prototype, 'register');

// ─── GET /users ───────────────────────────────────────────────────────────────
Get()(UsersController.prototype, 'findAll', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findAll'));
UseGuards(JwtAuthGuard, RolesGuard)(UsersController.prototype, 'findAll', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findAll'));
Roles(UserRole.ADMIN)(UsersController.prototype, 'findAll', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findAll'));
ApiBearerAuth('JWT-auth')(UsersController.prototype, 'findAll', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findAll'));
ApiOperation({ summary: 'Lister tous les utilisateurs (Admin)' })(UsersController.prototype, 'findAll', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findAll'));
ApiResponse({ status: 200, type: [UserResponseDto] })(UsersController.prototype, 'findAll', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findAll'));

// ─── GET /users/:id ───────────────────────────────────────────────────────────
Get(':id')(UsersController.prototype, 'findOne', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findOne'));
UseGuards(JwtAuthGuard)(UsersController.prototype, 'findOne', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findOne'));
ApiBearerAuth('JWT-auth')(UsersController.prototype, 'findOne', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findOne'));
ApiOperation({ summary: 'Récupérer un utilisateur par ID' })(UsersController.prototype, 'findOne', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findOne'));
ApiParam({ name: 'id', type: Number })(UsersController.prototype, 'findOne', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findOne'));
ApiResponse({ status: 200, type: UserResponseDto })(UsersController.prototype, 'findOne', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findOne'));
ApiResponse({ status: 404, description: 'Introuvable' })(UsersController.prototype, 'findOne', Object.getOwnPropertyDescriptor(UsersController.prototype, 'findOne'));
Param('id')(UsersController.prototype, 'findOne', 0);

// ─── PUT /users/:id ───────────────────────────────────────────────────────────
Put(':id')(UsersController.prototype, 'update', Object.getOwnPropertyDescriptor(UsersController.prototype, 'update'));
UseGuards(JwtAuthGuard)(UsersController.prototype, 'update', Object.getOwnPropertyDescriptor(UsersController.prototype, 'update'));
ApiBearerAuth('JWT-auth')(UsersController.prototype, 'update', Object.getOwnPropertyDescriptor(UsersController.prototype, 'update'));
ApiOperation({ summary: 'Modifier un utilisateur (propriétaire ou admin)' })(UsersController.prototype, 'update', Object.getOwnPropertyDescriptor(UsersController.prototype, 'update'));
ApiParam({ name: 'id', type: Number })(UsersController.prototype, 'update', Object.getOwnPropertyDescriptor(UsersController.prototype, 'update'));
ApiResponse({ status: 200, type: UserResponseDto })(UsersController.prototype, 'update', Object.getOwnPropertyDescriptor(UsersController.prototype, 'update'));
Param('id')(UsersController.prototype, 'update', 0);
Body()(UsersController.prototype, 'update', 1);
Request()(UsersController.prototype, 'update', 2);
Reflect.defineMetadata('design:paramtypes', [String, UpdateUserDto, Object], UsersController.prototype, 'update');

// ─── DELETE /users/:id ────────────────────────────────────────────────────────
Delete(':id')(UsersController.prototype, 'remove', Object.getOwnPropertyDescriptor(UsersController.prototype, 'remove'));
UseGuards(JwtAuthGuard)(UsersController.prototype, 'remove', Object.getOwnPropertyDescriptor(UsersController.prototype, 'remove'));
HttpCode(HttpStatus.NO_CONTENT)(UsersController.prototype, 'remove', Object.getOwnPropertyDescriptor(UsersController.prototype, 'remove'));
ApiBearerAuth('JWT-auth')(UsersController.prototype, 'remove', Object.getOwnPropertyDescriptor(UsersController.prototype, 'remove'));
ApiOperation({ summary: 'Supprimer un utilisateur (propriétaire ou admin)' })(UsersController.prototype, 'remove', Object.getOwnPropertyDescriptor(UsersController.prototype, 'remove'));
ApiParam({ name: 'id', type: Number })(UsersController.prototype, 'remove', Object.getOwnPropertyDescriptor(UsersController.prototype, 'remove'));
ApiResponse({ status: 204, description: 'Supprimé' })(UsersController.prototype, 'remove', Object.getOwnPropertyDescriptor(UsersController.prototype, 'remove'));
Param('id')(UsersController.prototype, 'remove', 0);
Request()(UsersController.prototype, 'remove', 1);

module.exports = { UsersController };
