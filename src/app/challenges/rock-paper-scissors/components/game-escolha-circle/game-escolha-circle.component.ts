import { EscolhaEnum } from '../../enums/escolha.enum';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-game-escolha-circle',
    templateUrl: './game-escolha-circle.component.html',
    styleUrls: ['./game-escolha-circle.component.scss'],
})
export class GameEscolhaCircleComponent {
    readonly escolha = input<EscolhaEnum | null>(null);
    readonly clickable = input(true);
    readonly size = input(120);
    readonly highlight = input(false);
}
