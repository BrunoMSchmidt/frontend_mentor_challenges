import { Route } from '@angular/router';

export const routes: Route[] = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'challenges',
    },
    {
        path: 'challenges',
        loadChildren: () => import('./challenges/challenges.routes').then(m => m.challengeRoutes),
    },
];
