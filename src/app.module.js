'use strict';

const { Module } = require('@nestjs/common');
const { ConfigModule } = require('@nestjs/config');
const { UsersModule } = require('./users/users.module');
const { AuthModule } = require('./auth/auth.module');

class AppModule {}

Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
  ],
})(AppModule);

module.exports = { AppModule };
