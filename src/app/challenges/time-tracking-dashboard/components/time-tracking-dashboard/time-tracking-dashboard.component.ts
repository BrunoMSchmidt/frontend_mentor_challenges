import { Activity } from '../../models/activity.model';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

enum Timeframes {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
}

@Component({
    selector: 'app-time-tracking-dashboard',
    templateUrl: './time-tracking-dashboard.component.html',
    styleUrls: ['./time-tracking-dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass],
})
export class TimeTrackingDashboardComponent {
    private http = inject(HttpClient);

    timeframe = signal(Timeframes.DAILY);

    data: Signal<Activity[]>;

    constructor() {
        this.data = toSignal(this.http.get<Activity[]>('/assets/challenges/time-tracking-dashboard/data.json'), {
            initialValue: [],
        });
    }

    setDaily(): void {
        this.timeframe.set(Timeframes.DAILY);
    }

    setWeekly(): void {
        this.timeframe.set(Timeframes.WEEKLY);
    }

    setMonthly(): void {
        this.timeframe.set(Timeframes.MONTHLY);
    }
}
