'use strict';

const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
};

class User {
  constructor({ id, email, username, password, role, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.password = password;
    this.role = role || UserRole.USER;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

module.exports = { User, UserRole };
