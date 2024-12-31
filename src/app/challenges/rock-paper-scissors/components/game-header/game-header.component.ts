import { Component, input } from '@angular/core';

@Component({
    selector: 'app-game-header',
    templateUrl: './game-header.component.html',
    styleUrls: ['./game-header.component.scss'],
})
export class GameHeaderComponent {
    readonly score = input.required<number>();
}
