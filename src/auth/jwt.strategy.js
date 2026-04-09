'use strict';

const { Injectable } = require('@nestjs/common');
const { PassportStrategy } = require('@nestjs/passport');
const { ExtractJwt, Strategy } = require('passport-jwt');

class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
    this.configService = configService;
  }

  async validate(payload) {
    return {
      id: payload.sub,
      email: payload.email,
      username: payload.username,
      role: payload.role,
    };
  }
}

Injectable()(JwtStrategy);
Reflect.defineMetadata('design:paramtypes', [
  require('@nestjs/config').ConfigService,
], JwtStrategy);

module.exports = { JwtStrategy };
