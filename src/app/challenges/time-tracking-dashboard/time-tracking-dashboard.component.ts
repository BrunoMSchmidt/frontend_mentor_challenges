import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

enum Timeframes {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly'
}

@Component({
  selector: 'app-time-tracking-dashboard',
  templateUrl: './time-tracking-dashboard.component.html',
  styleUrls: ['./time-tracking-dashboard.component.scss']
})
export class TimeTrackingDashboardComponent implements OnInit {

  timeframe: Timeframes = Timeframes.DAILY;

  data$: Observable<any>;

  constructor(private http: HttpClient) {
    this.data$ = this.http.get('/assets/challenges/time-tracking-dashboard/data.json')
  }

  ngOnInit(): void {
  }

  setDaily(){
    this.timeframe = Timeframes.DAILY;
  }

  setWeekly(){
    this.timeframe = Timeframes.WEEKLY;
  }

  setMonthly(){
    this.timeframe = Timeframes.MONTHLY;
  }
}
