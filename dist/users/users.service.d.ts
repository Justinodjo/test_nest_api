import { User, UserRole } from './user.entity';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
export declare class UsersService {
    private users;
    private idCounter;
    constructor();
    private seedAdmin;
    private sanitize;
    findAll(): Promise<UserResponseDto[]>;
    findOne(id: number): Promise<UserResponseDto>;
    findByEmail(email: string): Promise<User | undefined>;
    create(dto: CreateUserDto): Promise<UserResponseDto>;
    update(id: number, dto: UpdateUserDto, requesterId: number, requesterRole: UserRole): Promise<UserResponseDto>;
    remove(id: number, requesterId: number, requesterRole: UserRole): Promise<void>;
}
