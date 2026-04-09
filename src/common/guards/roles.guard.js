'use strict';

const { Injectable, CanActivate, ForbiddenException } = require('@nestjs/common');
const { Reflector } = require('@nestjs/core');
const { ROLES_KEY } = require('../decorators/roles.decorator');
const { UserRole } = require('../../users/user.entity');

class RolesGuard {
  constructor(reflector) {
    this.reflector = reflector;
  }

  canActivate(context) {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) return true;

    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new ForbiddenException('Utilisateur non authentifié');

    const hasRole = requiredRoles.some((role) => user.role === role);
    if (!hasRole) {
      throw new ForbiddenException(
        `Accès refusé. Rôle(s) requis : ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}

Injectable()(RolesGuard);
Reflect.defineMetadata('design:paramtypes', [Reflector], RolesGuard);

module.exports = { RolesGuard };
