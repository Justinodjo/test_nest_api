'use strict';

const { Injectable, UnauthorizedException } = require('@nestjs/common');
const bcrypt = require('bcryptjs');

class AuthService {
  constructor(usersService, jwtService) {
    this.usersService = usersService;
    this.jwtService = jwtService;
  }

  async login(dto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid) throw new UnauthorizedException('Email ou mot de passe incorrect');

    const payload = {
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async getProfile(userId) {
    return this.usersService.findOne(userId);
  }
}

Injectable()(AuthService);
Reflect.defineMetadata('design:paramtypes', [
  require('../users/users.service').UsersService,
  require('@nestjs/jwt').JwtService,
], AuthService);

module.exports = { AuthService };
