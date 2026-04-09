'use strict';

const { Module } = require('@nestjs/common');
const { ConfigModule } = require('@nestjs/config');
const { UsersModule } = require('./users/users.module');
const { AuthModule } = require('./auth/auth.module');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    AuthModule,
  ],
})
class AppModule {}

module.exports = { AppModule };