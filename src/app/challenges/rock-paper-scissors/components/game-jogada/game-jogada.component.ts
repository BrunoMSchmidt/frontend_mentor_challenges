import { GameEscolhaCircleComponent } from '../game-escolha-circle/game-escolha-circle.component';
import { EscolhaEnum } from '../../enums/escolha.enum';
import { ResultadoEnum } from '../../enums/resultado.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-game-jogada',
    templateUrl: './game-jogada.component.html',
    styleUrls: ['./game-jogada.component.scss'],
    animations: [
        trigger('grow', [
            transition(':enter', [
                style({ width: 0, opacity: 0, transform: 'translateY(-120%)' }),
                animate('200ms ease-out', style({ width: '*', opacity: 1, transform: 'none' })),
            ]),
        ]),
    ],
    imports: [GameEscolhaCircleComponent, NgIf],
})
export class GameJogadaComponent {
    @Input() jogador: EscolhaEnum | null = null;
    @Input() computador: EscolhaEnum | null = null;
    @Input() resultado: ResultadoEnum | null = null;
    @Output() resetEvent = new EventEmitter<void>();

    readonly ResultadoEnum = ResultadoEnum;

    resetar(): void {
        this.resetEvent.emit();
    }

    getResultText(): string | void {
        if (!this.resultado) {
            return;
        }

        const resultado: Record<ResultadoEnum, string> = {
            [ResultadoEnum.Jogador]: 'YOU WIN',
            [ResultadoEnum.Computador]: 'YOU LOSE',
            [ResultadoEnum.Empate]: 'TIE GAME',
        };

        return resultado[this.resultado];
    }
}
