export interface LoginType {
    email: string;
    password: string;
}

export interface SignUpType {
    user: { username: string; email: string; password: string };
    contact_info: number | undefined;
}

export interface UserType {
    id: number;
    user: { id: number; username: string; email: string };
    contact_info: number;
}
export interface UserState {
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    user: UserType | null;
}

export interface ErrorType {
    error: string;
}

export interface Event {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    is_host: boolean;
}

export interface SubEvent {
    id: number;
    name: string;
    description: string;
    start_datetime: string;
    end_datetime: string;
    venue_name: string;
    venue_location: string;
    venue_capacity: number;
    capacity: number;
}