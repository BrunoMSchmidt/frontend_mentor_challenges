import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderSummaryComponent } from './order-summary.component';

const routes = [
  {
    path: '',
    component: OrderSummaryComponent
  }
]

@NgModule({
  declarations: [
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
})
export class OrderSummaryModule {}
