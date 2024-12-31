import { GameEscolhaCircleComponent } from '../game-escolha-circle/game-escolha-circle.component';
import { EscolhaEnum } from '../../enums/escolha.enum';
import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
    selector: 'app-game-escolhas',
    templateUrl: './game-escolhas.component.html',
    styleUrls: ['./game-escolhas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GameEscolhaCircleComponent],
})
export class GameEscolhasComponent {
    public escolhasPossiveis: EscolhaEnum[] = Object.values(EscolhaEnum);
    readonly escolha = output<EscolhaEnum>();

    escolher(escolha: EscolhaEnum): void {
        this.escolha.emit(escolha);
    }
}
