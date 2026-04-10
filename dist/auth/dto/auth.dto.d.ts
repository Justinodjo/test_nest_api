export declare class LoginDto {
    email: string;
    password: string;
}
export declare class AuthResponseDto {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: {
        id: number;
        email: string;
        username: string;
        role: string;
    };
}
