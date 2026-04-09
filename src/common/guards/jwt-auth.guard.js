'use strict';

const { Injectable, UnauthorizedException } = require('@nestjs/common');
const { AuthGuard } = require('@nestjs/passport');

class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token JWT manquant ou invalide');
    }
    return user;
  }
}

Injectable()(JwtAuthGuard);

module.exports = { JwtAuthGuard };
