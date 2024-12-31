/* eslint-disable sonarjs/todo-tag */
// TODO REVER
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgClass, AsyncPipe } from '@angular/common';

enum Timeframes {
    DAILY = 'daily',
    WEEKLY = 'weekly',
    MONTHLY = 'monthly',
}

@Component({
    selector: 'app-time-tracking-dashboard',
    templateUrl: './time-tracking-dashboard.component.html',
    styleUrls: ['./time-tracking-dashboard.component.scss'],
    imports: [NgClass, AsyncPipe],
})
export class TimeTrackingDashboardComponent {
    timeframe: Timeframes = Timeframes.DAILY;

    // TODO REVER
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data$: Observable<any>;

    constructor(private http: HttpClient) {
        this.data$ = this.http.get('/assets/challenges/time-tracking-dashboard/data.json');
    }

    setDaily(): void {
        this.timeframe = Timeframes.DAILY;
    }

    setWeekly(): void {
        this.timeframe = Timeframes.WEEKLY;
    }

    setMonthly(): void {
        this.timeframe = Timeframes.MONTHLY;
    }
}
