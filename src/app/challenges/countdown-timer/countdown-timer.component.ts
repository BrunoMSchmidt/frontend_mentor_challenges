import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'app-countdown-timer',
    templateUrl: './countdown-timer.component.html',
    styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
    finishTime: Date = new Date(2024, 11, 31);

    timeLeft = {
        seconds: '',
        minutes: '',
        hours: '',
        days: '',
    };

    intervalSubscription?: Subscription;

    ngOnInit(): void {
        this.setTimeLeft();

        this.intervalSubscription = interval(1000).subscribe(() => {
            this.setTimeLeft();
            // this.configDate.min = this.formatDate(new Date(), 'DD/MM/YYYYThh:mm:ssZ')
        });
    }

    setTimeLeft(): void {
        const diff = this.finishTime.getTime() - new Date().getTime();
        if (diff >= 0) {
            this.timeLeft.seconds = this.addZeros(Math.floor((diff / 1000) % 60));

            this.timeLeft.minutes = this.addZeros(Math.floor((diff / 1000 / 60) % 60));

            this.timeLeft.hours = this.addZeros(Math.floor((diff / 1000 / 60 / 60) % 24));

            this.timeLeft.days = this.addZeros(Math.floor(diff / 1000 / 60 / 60 / 24));
        }
    }

    setFinishTime(data: string | Date): void {
        if (typeof data == 'string') {
            this.finishTime = new Date(data);
        } else if (data instanceof Date) {
            this.finishTime = data;
        }
        this.setTimeLeft();
    }

    /**
     * Formata a data para o formato espeficado
     * @param data
     * @returns
     */
    formatDate(data: Date, format: string): string {
        return format
            .replace('YYYY', data.getFullYear().toString())
            .replace('MM', this.addZeros(data.getMonth() + 1))
            .replace('DD', this.addZeros(data.getDate()))
            .replace('hh', this.addZeros(data.getHours()))
            .replace('mm', this.addZeros(data.getMinutes()))
            .replace('ss', this.addZeros(data.getSeconds()));
    }

    addZeros(value: number | string, zeros = 2): string {
        return value.toString().padStart(zeros, '0');
    }

    ngOnDestroy(): void {
        this.intervalSubscription?.unsubscribe();
    }
}
