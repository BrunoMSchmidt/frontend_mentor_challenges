import { Routes } from '@angular/router';

export const challengeRoutes: Routes = [
    {
        path: 'tip-calculator',
        loadComponent: () => import('./tip-calculator/tip-calculator.component').then(m => m.TipCalculatorComponent),
    },
    {
        path: 'columns-preview-card',
        loadComponent: () =>
            import('./columns-preview-card/columns-preview-card.component').then(m => m.ColumnsPreviewCardComponent),
    },
    {
        path: 'order-summary',
        loadComponent: () => import('./order-summary/order-summary.component').then(m => m.OrderSummaryComponent),
    },
    {
        path: 'time-tracking-dashboard',
        loadComponent: () =>
            import('./time-tracking-dashboard/time-tracking-dashboard.component').then(
                m => m.TimeTrackingDashboardComponent,
            ),
    },
    {
        path: 'countdown-timer',
        loadComponent: () => import('./countdown-timer/countdown-timer.component').then(m => m.CountdownTimerComponent),
    },
    {
        path: 'todo',
        loadComponent: () => import('./todo/todo.component').then(m => m.TodoComponent),
    },
    {
        path: 'rock-paper-scissors',
        loadComponent: () => import('./rock-paper-scissors/components/game.component').then(m => m.GameComponent),
    },
];
