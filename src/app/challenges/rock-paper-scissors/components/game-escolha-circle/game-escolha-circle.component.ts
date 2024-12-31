import { EscolhaEnum } from '../../enums/escolha.enum';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-game-escolha-circle',
    templateUrl: './game-escolha-circle.component.html',
    styleUrls: ['./game-escolha-circle.component.scss'],
})
export class GameEscolhaCircleComponent {
    @Input() escolha: EscolhaEnum | null = null;
    @Input() clickable = true;
    @Input() size = 120;
    @Input() highlight = false;
}
