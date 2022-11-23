import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'tip-calculator',
        loadChildren: () =>
            import('./tip-calculator/tip-calculator.module').then(
                (m) => m.TipCalculatorModule
            ),
    },
    {
        path: 'columns-preview-card',
        loadChildren: () =>
            import('./columns-preview-card/columns-preview-card.module').then(
                (m) => m.ColumnsPreviewCardModule
            ),
    },
    {
        path: 'order-summary',
        loadChildren: () =>
            import('./order-summary/order-summary.module').then(
                (m) => m.OrderSummaryModule
            ),
    },
    {
        path: 'time-tracking-dashboard',
        loadChildren: () =>
            import(
                './time-tracking-dashboard/time-tracking-dashboard.module'
            ).then((m) => m.TimeTrackingDashboardModule),
    },
    {
        path: 'countdown-timer',
        loadChildren: () =>
            import('./countdown-timer/countdown-timer.module').then(
                (m) => m.CountdownTimerModule
            ),
    },
    {
        path: 'todo',
        loadChildren: () =>
            import('./todo/todo.module').then((m) => m.TodoModule),
    },
    {
        path: 'rock-paper-scissors',
        loadChildren: () =>
            import('./rock-paper-scissors/rock-paper-scissors.module').then(
                (m) => m.RockPaperScissorsModule
            ),
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChallengesRoutingModule {}
