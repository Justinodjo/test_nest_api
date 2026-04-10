"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const user_entity_1 = require("./user.entity");
let UsersService = class UsersService {
    users = [];
    idCounter = 1;
    constructor() {
        this.seedAdmin();
    }
    async seedAdmin() {
        const hashedPassword = await bcrypt.hash('Admin@1234', 10);
        this.users.push({
            id: this.idCounter++,
            email: 'admin@example.com',
            username: 'admin',
            password: hashedPassword,
            role: user_entity_1.UserRole.ADMIN,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
    sanitize(user) {
        const { password, ...result } = user;
        return result;
    }
    async findAll() {
        return this.users.map((u) => this.sanitize(u));
    }
    async findOne(id) {
        const user = this.users.find((u) => u.id === id);
        if (!user)
            throw new common_1.NotFoundException(`Utilisateur #${id} introuvable`);
        return this.sanitize(user);
    }
    async findByEmail(email) {
        return this.users.find((u) => u.email === email);
    }
    async create(dto) {
        const exists = this.users.find((u) => u.email === dto.email || u.username === dto.username);
        if (exists) {
            throw new common_1.ConflictException('Email ou nom d\'utilisateur déjà utilisé');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const newUser = {
            id: this.idCounter++,
            email: dto.email,
            username: dto.username,
            password: hashedPassword,
            role: dto.role ?? user_entity_1.UserRole.USER,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.users.push(newUser);
        return this.sanitize(newUser);
    }
    async update(id, dto, requesterId, requesterRole) {
        const userIndex = this.users.findIndex((u) => u.id === id);
        if (userIndex === -1)
            throw new common_1.NotFoundException(`Utilisateur #${id} introuvable`);
        if (requesterRole !== user_entity_1.UserRole.ADMIN && requesterId !== id) {
            throw new common_1.ForbiddenException('Accès refusé');
        }
        if (dto.role && requesterRole !== user_entity_1.UserRole.ADMIN) {
            throw new common_1.ForbiddenException('Seul un admin peut modifier les rôles');
        }
        const user = this.users[userIndex];
        if (dto.email && dto.email !== user.email) {
            const emailExists = this.users.find((u) => u.email === dto.email);
            if (emailExists)
                throw new common_1.ConflictException('Email déjà utilisé');
        }
        if (dto.password) {
            dto = { ...dto, password: await bcrypt.hash(dto.password, 10) };
        }
        this.users[userIndex] = {
            ...user,
            ...dto,
            updatedAt: new Date(),
        };
        return this.sanitize(this.users[userIndex]);
    }
    async remove(id, requesterId, requesterRole) {
        const userIndex = this.users.findIndex((u) => u.id === id);
        if (userIndex === -1)
            throw new common_1.NotFoundException(`Utilisateur #${id} introuvable`);
        if (requesterRole !== user_entity_1.UserRole.ADMIN && requesterId !== id) {
            throw new common_1.ForbiddenException('Accès refusé');
        }
        this.users.splice(userIndex, 1);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UsersService);
//# sourceMappingURL=users.service.js.map