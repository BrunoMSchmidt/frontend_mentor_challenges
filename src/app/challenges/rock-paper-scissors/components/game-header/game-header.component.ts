import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
    selector: 'app-game-header',
    templateUrl: './game-header.component.html',
    styleUrls: ['./game-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameHeaderComponent {
    readonly score = input.required<number>();
}
