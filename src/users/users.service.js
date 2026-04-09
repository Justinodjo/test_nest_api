'use strict';

const { Injectable, NotFoundException, ConflictException, ForbiddenException } = require('@nestjs/common');
const bcrypt = require('bcryptjs');
const { User, UserRole } = require('./user.entity');

class UsersService {
  constructor() {
    this.users = [];
    this.idCounter = 1;
    this._seedAdmin();
  }

  async _seedAdmin() {
    const hashedPassword = await bcrypt.hash('Admin@1234', 10);
    this.users.push(new User({
      id: this.idCounter++,
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
  }

  _sanitize(user) {
    const { password, ...result } = user;
    return result;
  }

  async findAll() {
    return this.users.map((u) => this._sanitize(u));
  }

  async findOne(id) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`Utilisateur #${id} introuvable`);
    return this._sanitize(user);
  }

  async findByEmail(email) {
    return this.users.find((u) => u.email === email);
  }

  async create(dto) {
    const exists = this.users.find(
      (u) => u.email === dto.email || u.username === dto.username,
    );
    if (exists) throw new ConflictException("Email ou nom d'utilisateur déjà utilisé");

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = new User({
      id: this.idCounter++,
      email: dto.email,
      username: dto.username,
      password: hashedPassword,
      role: dto.role || UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.push(newUser);
    return this._sanitize(newUser);
  }

  async update(id, dto, requesterId, requesterRole) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException(`Utilisateur #${id} introuvable`);

    if (requesterRole !== UserRole.ADMIN && requesterId !== id) {
      throw new ForbiddenException('Accès refusé');
    }

    if (dto.role && requesterRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Seul un admin peut modifier les rôles');
    }

    const user = this.users[userIndex];

    if (dto.email && dto.email !== user.email) {
      const emailExists = this.users.find((u) => u.email === dto.email);
      if (emailExists) throw new ConflictException('Email déjà utilisé');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    this.users[userIndex] = { ...user, ...dto, updatedAt: new Date() };
    return this._sanitize(this.users[userIndex]);
  }

  async remove(id, requesterId, requesterRole) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException(`Utilisateur #${id} introuvable`);

    if (requesterRole !== UserRole.ADMIN && requesterId !== id) {
      throw new ForbiddenException('Accès refusé');
    }

    this.users.splice(userIndex, 1);
  }
}

Injectable()(UsersService);

module.exports = { UsersService };
