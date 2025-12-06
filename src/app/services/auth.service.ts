import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserCredentials, RegisterData } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly storageKey = 'auth_user';
    private userSignal = signal<User | null>(this.getStoredUser());

    user = computed(() => this.userSignal());
    isAuthenticated = computed(() => !!this.user());

    constructor(private router: Router) {}

    private getStoredUser(): User | null {
        const storedUser = localStorage.getItem(this.storageKey);
        return storedUser ? JSON.parse(storedUser) : null;
    }

    private setStoredUser(user: User | null): void {
        if (user) {
            localStorage.setItem(this.storageKey, JSON.stringify(user));
        } else {
            localStorage.removeItem(this.storageKey);
        }
        this.userSignal.set(user);
    }

    async login(credentials: UserCredentials): Promise<void> {
        try {
            // Simulação de chamada à API
            const mockUser: User = {
                id: '1',
                email: credentials.email,
                name: 'Usuário Teste',
                isEmailVerified: true
            };
            this.setStoredUser(mockUser);
            console.log('Login realizado com sucesso:', mockUser);
            await this.router.navigate(['/']);
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            throw new Error('Falha ao realizar login. Por favor, tente novamente.');
        }
    }

    async register(data: RegisterData): Promise<void> {
        try {
            // Simulação de chamada à API
            const mockUser: User = {
                id: '1',
                email: data.email,
                name: data.name,
                isEmailVerified: false
            };
            this.setStoredUser(mockUser);
            console.log('Registro realizado com sucesso:', mockUser);
            await this.router.navigate(['/']);
        } catch (error) {
            console.error('Erro ao realizar registro:', error);
            throw new Error('Falha ao realizar registro. Por favor, tente novamente.');
        }
    }

    async loginWithGoogle(): Promise<void> {
        try {
            // Simulação de autenticação com Google
            const mockUser: User = {
                id: '2',
                email: 'usuario@gmail.com',
                name: 'Usuário Google',
                photoURL: 'https://exemplo.com/foto.jpg',
                isEmailVerified: true
            };
            this.setStoredUser(mockUser);
            console.log('Login com Google realizado com sucesso:', mockUser);
            await this.router.navigate(['/']);
        } catch (error) {
            console.error('Erro ao realizar login com Google:', error);
            throw new Error('Falha ao realizar login com Google. Por favor, tente novamente.');
        }
    }

    async logout(): Promise<void> {
        try {
            this.setStoredUser(null);
            console.log('Logout realizado com sucesso');
            await this.router.navigate(['/login']);
        } catch (error) {
            console.error('Erro ao realizar logout:', error);
            throw new Error('Falha ao realizar logout. Por favor, tente novamente.');
        }
    }
}