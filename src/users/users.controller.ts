import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ─── PUBLIC: Inscription ─────────────────────────────────────────────────────
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer un nouveau compte utilisateur' })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès', type: UserResponseDto })
  @ApiResponse({ status: 409, description: 'Email ou username déjà utilisé' })
  @ApiResponse({ status: 400, description: 'Données invalides' })
  async register(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  // ─── PROTÉGÉ: Lister tous les utilisateurs (Admin seulement) ─────────────────
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Lister tous les utilisateurs (Admin)' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs', type: [UserResponseDto] })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  async findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  // ─── PROTÉGÉ: Voir son profil ou un user (Admin) ─────────────────────────────
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Récupérer un utilisateur par ID' })
  @ApiParam({ name: 'id', type: Number, description: "ID de l'utilisateur" })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé', type: UserResponseDto })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  // ─── PROTÉGÉ: Modifier un utilisateur ────────────────────────────────────────
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Modifier un utilisateur (propriétaire ou admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour', type: UserResponseDto })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @Request() req,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, dto, req.user.id, req.user.role);
  }

  // ─── PROTÉGÉ: Supprimer un utilisateur ───────────────────────────────────────
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Supprimer un utilisateur (propriétaire ou admin)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Utilisateur supprimé' })
  @ApiResponse({ status: 403, description: 'Accès refusé' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable' })
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<void> {
    return this.usersService.remove(id, req.user.id, req.user.role);
  }
}
