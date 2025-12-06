import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="auth-container">
            <div class="auth-card">
                <h2>Entrar</h2>
                <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="auth-form">
                    <div class="form-group">
                        <label for="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            formControlName="email"
                            placeholder="Seu e-mail"
                            [class.error]="isFieldInvalid('email')"
                        >
                        <div class="error-message" *ngIf="isFieldInvalid('email')">
                            <span *ngIf="loginForm.get('email')?.errors?.['required']">E-mail é obrigatório</span>
                            <span *ngIf="loginForm.get('email')?.errors?.['email']">E-mail inválido</span>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            formControlName="password"
                            placeholder="Sua senha"
                            [class.error]="isFieldInvalid('password')"
                        >
                        <div class="error-message" *ngIf="isFieldInvalid('password')">
                            <span *ngIf="loginForm.get('password')?.errors?.['required']">Senha é obrigatória</span>
                            <span *ngIf="loginForm.get('password')?.errors?.['minlength']">Senha deve ter no mínimo 6 caracteres</span>
                        </div>
                    </div>

                    <button type="submit" class="btn-primary" [disabled]="loginForm.invalid || isLoading">
                        {{ isLoading ? 'Entrando...' : 'Entrar' }}
                    </button>

                    <button type="button" class="btn-google" (click)="onGoogleLogin()" [disabled]="isLoading">
                        <img src="assets/google-icon.svg" alt="Google Icon">
                        Entrar com Google
                    </button>

                    <p class="auth-links">
                        Não tem uma conta?
                        <a routerLink="/register">Registre-se</a>
                    </p>
                </form>
            </div>
        </div>
    `,
    styles: [`
        .auth-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f5f5f5;
            padding: 1rem;
        }

        .auth-card {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;

            h2 {
                text-align: center;
                color: #333;
                margin-bottom: 2rem;
            }
        }

        .auth-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            label {
                color: #666;
                font-size: 0.9rem;
            }

            input {
                padding: 0.75rem;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 1rem;

                &:focus {
                    outline: none;
                    border-color: #98D8AA;
                }

                &.error {
                    border-color: #FF9B9B;
                }
            }
        }

        .error-message {
            color: #FF9B9B;
            font-size: 0.875rem;
        }

        .btn-primary {
            background-color: #98D8AA;
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover:not(:disabled) {
                background-color: #7ac78e;
            }

            &:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
        }

        .btn-google {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            background-color: white;
            color: #666;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 1rem;
            cursor: pointer;
            transition: background-color 0.2s;

            img {
                width: 20px;
                height: 20px;
            }

            &:hover:not(:disabled) {
                background-color: #f5f5f5;
            }

            &:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
        }

        .auth-links {
            text-align: center;
            color: #666;
            margin-top: 1rem;

            a {
                color: #98D8AA;
                text-decoration: none;
                font-weight: 500;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    `]
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm: FormGroup = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    isLoading = false;

    isFieldInvalid(fieldName: string): boolean {
        const field = this.loginForm.get(fieldName);
        return field ? field.invalid && (field.dirty || field.touched) : false;
    }

    async onSubmit() {
        if (this.loginForm.valid && !this.isLoading) {
            this.isLoading = true;
            try {
                await this.authService.login(this.loginForm.value);
                console.log('Login realizado com sucesso');
            } catch (error) {
                console.error('Erro ao realizar login:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }

    async onGoogleLogin() {
        if (!this.isLoading) {
            this.isLoading = true;
            try {
                await this.authService.loginWithGoogle();
                console.log('Login com Google realizado com sucesso');
            } catch (error) {
                console.error('Erro ao realizar login com Google:', error);
            } finally {
                this.isLoading = false;
            }
        }
    }
}