import { UserRole } from '../user.entity';
export declare class CreateUserDto {
    email: string;
    username: string;
    password: string;
    role?: UserRole;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "password">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    password?: string;
}
export declare class UserResponseDto {
    id: number;
    email: string;
    username: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
export {};
