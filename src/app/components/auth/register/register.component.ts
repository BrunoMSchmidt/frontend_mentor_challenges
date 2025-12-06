import { Component, inject } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <div class="auth-container">
          <div class="auth-card">
            <h2>Criar Conta</h2>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="auth-form">
              <div class="form-group">
                <label for="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  formControlName="name"
                  placeholder="Seu nome completo"
                  [class.error]="isFieldInvalid('name')"
                  >
                  @if (isFieldInvalid('name')) {
                    <div class="error-message">
                      @if (registerForm.get('name')?.errors?.['required']) {
                        <span>Nome é obrigatório</span>
                      }
                      @if (registerForm.get('name')?.errors?.['minlength']) {
                        <span>Nome deve ter no mínimo 3 caracteres</span>
                      }
                    </div>
                  }
                </div>
        
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    placeholder="Seu e-mail"
                    [class.error]="isFieldInvalid('email')"
                    >
                    @if (isFieldInvalid('email')) {
                      <div class="error-message">
                        @if (registerForm.get('email')?.errors?.['required']) {
                          <span>E-mail é obrigatório</span>
                        }
                        @if (registerForm.get('email')?.errors?.['email']) {
                          <span>E-mail inválido</span>
                        }
                      </div>
                    }
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
                      @if (isFieldInvalid('password')) {
                        <div class="error-message">
                          @if (registerForm.get('password')?.errors?.['required']) {
                            <span>Senha é obrigatória</span>
                          }
                          @if (registerForm.get('password')?.errors?.['minlength']) {
                            <span>Senha deve ter no mínimo 6 caracteres</span>
                          }
                        </div>
                      }
                    </div>
        
                    <button type="submit" class="btn-primary" [disabled]="registerForm.invalid || isLoading">
                      {{ isLoading ? 'Registrando...' : 'Registrar' }}
                    </button>
        
                    <button type="button" class="btn-google" (click)="onGoogleLogin()" [disabled]="isLoading">
                      <img src="assets/google-icon.svg" alt="Google Icon">
                      Registrar com Google
                    </button>
        
                    <p class="auth-links">
                      Já tem uma conta?
                      <a routerLink="/login">Entrar</a>
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
export class RegisterComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    registerForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    isLoading = false;

    isFieldInvalid(fieldName: string): boolean {
        const field = this.registerForm.get(fieldName);
        return field ? field.invalid && (field.dirty || field.touched) : false;
    }

    async onSubmit() {
        if (this.registerForm.valid && !this.isLoading) {
            this.isLoading = true;
            try {
                await this.authService.register(this.registerForm.value);
                console.log('Registro realizado com sucesso');
            } catch (error) {
                console.error('Erro ao realizar registro:', error);
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