import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TimeTrackingDashboardComponent } from './time-tracking-dashboard.component';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  {
    path: '',
    component: TimeTrackingDashboardComponent
  }
]

@NgModule({
  declarations: [
    TimeTrackingDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
})
export class TimeTrackingDashboardModule {}
