import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, AuthResponseDto } from './dto/auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(dto: LoginDto): Promise<AuthResponseDto>;
    getProfile(userId: number): Promise<import("../users/dto/user.dto").UserResponseDto>;
}
