import { Time } from './models/time.model';
import { Component, ChangeDetectionStrategy, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-countdown-timer',
    templateUrl: './countdown-timer.component.html',
    styleUrls: ['./countdown-timer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownTimerComponent {
    private readonly finishTime: Date = new Date(2025, 0, 1);

    timeLeft: Signal<Time>;

    constructor() {
        this.timeLeft = toSignal(interval(1000).pipe(map(() => this.getTimeLeft())), {
            initialValue: this.getTimeLeft(),
        });
    }

    private getTimeLeft(): Time {
        const diff = this.finishTime.getTime() - new Date().getTime();

        if (diff >= 0) {
            return {
                seconds: this.addZeros(Math.floor((diff / 1000) % 60)),
                minutes: this.addZeros(Math.floor((diff / (1000 * 60)) % 60)),
                hours: this.addZeros(Math.floor((diff / (1000 * 60 * 60)) % 24)),
                days: this.addZeros(Math.floor(diff / (1000 * 60 * 60 * 24))),
            };
        }

        return {
            seconds: this.addZeros(0),
            minutes: this.addZeros(0),
            hours: this.addZeros(0),
            days: this.addZeros(0),
        };
    }

    private addZeros(value: number | string, zeros = 2): string {
        return value.toString().padStart(zeros, '0');
    }
}
