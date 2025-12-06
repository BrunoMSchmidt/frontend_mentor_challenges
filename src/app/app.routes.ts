import { Routes } from '@angular/router';
import { authGuard, publicOnlyGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'challenges',
    },
    {
        path: 'challenges',
        loadChildren: () => import('./challenges/challenges.routes').then(m => m.challengeRoutes),
        canActivate: [authGuard]
    },
    {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [publicOnlyGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent),
        canActivate: [publicOnlyGuard]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
