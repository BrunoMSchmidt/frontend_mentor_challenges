export interface User {
    id: string;
    email: string;
    name: string;
    photoURL?: string;
    isEmailVerified?: boolean;
}

export interface UserCredentials {
    email: string;
    password: string;
}

export interface RegisterData extends UserCredentials {
    name: string;
}