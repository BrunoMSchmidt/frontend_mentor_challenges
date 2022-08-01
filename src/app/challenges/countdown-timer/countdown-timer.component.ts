import { Component, OnInit,  } from '@angular/core';
import { ECalendarValue, IDatePickerConfig } from 'ng2-date-picker';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit {
  finishTime: Date = new Date(2022, 11, 30);

  timeLeft = {
    seconds: '',
    minutes: '',
    hours: '',
    days: '',
  };

  configDate: IDatePickerConfig = {
    showTwentyFourHours: true,
    returnedValueType: ECalendarValue.String,
    min: this.formatDate(new Date(), 'DD/MM/YYYYThh:mm:ssZ'),
    locale: 'pt-br',
    showSeconds: true
  };

  intervalSubscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    this.setTimeLeft();

    this.intervalSubscription = interval(1000).subscribe(
      () => {
        this.setTimeLeft();
        this.configDate.min = this.formatDate(new Date(), 'DD/MM/YYYYThh:mm:ssZ')
      },
    );
  }

  setTimeLeft() {
    let diff = this.finishTime.getTime() - new Date().getTime();
    if (diff >= 0) {
      this.timeLeft.seconds = this.addZeros(Math.floor((diff / 1000) % 60));

      this.timeLeft.minutes = this.addZeros(
        Math.floor((diff / 1000 / 60) % 60)
      );

      this.timeLeft.hours = this.addZeros(
        Math.floor((diff / 1000 / 60 / 60) % 24)
      );

      this.timeLeft.days = this.addZeros(
        Math.floor(diff / 1000 / 60 / 60 / 24)
      );
    }
  }

  setFinishTime(data: string | Date) {
    if (typeof data == 'string') {
      this.finishTime = new Date(data);
    } else if(data instanceof Date) {
      this.finishTime = data;
    }
    this.setTimeLeft();
  }

  /**
   * Formata a data para o formato espeficado
   * @param data
   * @returns
   */
  formatDate(data: Date, format: string) {
    let string = format;

    string = string
      .replace('YYYY', data.getFullYear().toString())
      .replace('MM', this.addZeros(data.getMonth() + 1))
      .replace('DD', this.addZeros(data.getDate()))
      .replace('hh', this.addZeros(data.getHours()))
      .replace('mm', this.addZeros(data.getMinutes()))
      .replace('ss', this.addZeros(data.getSeconds()));


    return string;
  }

  addZeros(value: number | string, zeros = 2) {
    return value.toString().padStart(zeros, '0');
  }

  log(value: any){
    console.log(value);
  }

  ngOnDestroy(): void {
    this.intervalSubscription?.unsubscribe();
  }
}
