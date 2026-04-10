import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from './user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  constructor() {
    // Seed admin par défaut
    this.seedAdmin();
  }

  private async seedAdmin() {
    const hashedPassword = await bcrypt.hash('Admin@1234', 10);
    this.users.push({
      id: this.idCounter++,
      email: 'admin@example.com',
      username: 'admin',
      password: hashedPassword,
      role: UserRole.ADMIN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private sanitize(user: User): UserResponseDto {
    const { password, ...result } = user;
    return result as UserResponseDto;
  }

  async findAll(): Promise<UserResponseDto[]> {
    return this.users.map((u) => this.sanitize(u));
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`Utilisateur #${id} introuvable`);
    return this.sanitize(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email === email);
  }

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const exists = this.users.find(
      (u) => u.email === dto.email || u.username === dto.username,
    );
    if (exists) {
      throw new ConflictException('Email ou nom d\'utilisateur déjà utilisé');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser: User = {
      id: this.idCounter++,
      email: dto.email,
      username: dto.username,
      password: hashedPassword,
      role: dto.role ?? UserRole.USER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return this.sanitize(newUser);
  }

  async update(
    id: number,
    dto: UpdateUserDto,
    requesterId: number,
    requesterRole: UserRole,
  ): Promise<UserResponseDto> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException(`Utilisateur #${id} introuvable`);

    // Seul l'admin ou le propriétaire peut modifier
    if (requesterRole !== UserRole.ADMIN && requesterId !== id) {
      throw new ForbiddenException('Accès refusé');
    }

    // Seul l'admin peut changer le rôle
    if (dto.role && requesterRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Seul un admin peut modifier les rôles');
    }

    const user = this.users[userIndex];

    if (dto.email && dto.email !== user.email) {
      const emailExists = this.users.find((u) => u.email === dto.email);
      if (emailExists) throw new ConflictException('Email déjà utilisé');
    }

    if (dto.password) {
      dto = { ...dto, password: await bcrypt.hash(dto.password, 10) } as any;
    }

    this.users[userIndex] = {
      ...user,
      ...dto,
      updatedAt: new Date(),
    };

    return this.sanitize(this.users[userIndex]);
  }

  async remove(id: number, requesterId: number, requesterRole: UserRole): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) throw new NotFoundException(`Utilisateur #${id} introuvable`);

    if (requesterRole !== UserRole.ADMIN && requesterId !== id) {
      throw new ForbiddenException('Accès refusé');
    }

    this.users.splice(userIndex, 1);
  }
}
