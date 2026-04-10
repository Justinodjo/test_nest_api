import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(dto: CreateUserDto): Promise<UserResponseDto>;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: number): Promise<UserResponseDto>;
    update(id: number, dto: UpdateUserDto, req: any): Promise<UserResponseDto>;
    remove(id: number, req: any): Promise<void>;
}
