export interface LoginType {
    email: string;
    password: string;
}

export interface SignUpType {
    user: { username: string; email: string; password: string };
    contact_info: number | undefined;
}

export interface UserState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface ErrorType{
    error: string ;
}