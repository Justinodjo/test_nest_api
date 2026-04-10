export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class User {
  id: number;
  email: string;
  username: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
