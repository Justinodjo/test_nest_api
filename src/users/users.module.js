'use strict';

const { Module } = require('@nestjs/common');
const { UsersController } = require('./users.controller');
const { UsersService } = require('./users.service');

class UsersModule {}

Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})(UsersModule);

module.exports = { UsersModule };
