import { AuthService } from './auth.service';
import { LoginDto, AuthResponseDto } from './dto/auth.dto';
import { UserResponseDto } from '../users/dto/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<AuthResponseDto>;
    getProfile(req: any): Promise<UserResponseDto>;
}
