export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    id: number;
    email: string;
    username: string;
    password: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
