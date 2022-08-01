import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CountdownTimerComponent } from './countdown-timer.component';
import { DpDatePickerModule } from 'ng2-date-picker';

const routes = [
  {
    path: '',
    component: CountdownTimerComponent
  }
]

@NgModule({
  declarations: [
    CountdownTimerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    DpDatePickerModule
  ],
})
export class CountdownTimerModule {}
