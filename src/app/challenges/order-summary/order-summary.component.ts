import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-order-summary',
    templateUrl: './order-summary.component.html',
    styleUrls: ['./order-summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderSummaryComponent {}
