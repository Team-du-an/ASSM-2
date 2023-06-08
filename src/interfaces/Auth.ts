export interface IAuth {
    id: string;
    username: string;
    email: string;
    password: string;
    gender: string;
    role?: string;
    isActive?: boolean;
}
