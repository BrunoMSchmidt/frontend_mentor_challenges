import { GameEscolhaCircleComponent } from '../game-escolha-circle/game-escolha-circle.component';
import { EscolhaEnum } from '../../enums/escolha.enum';
import { ResultadoEnum } from '../../enums/resultado.enum';
import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GameEscolhaCircleComponent],
})
export class GameJogadaComponent {
    readonly jogador = input<EscolhaEnum | null>(null);
    readonly computador = input<EscolhaEnum | null>(null);
    readonly resultado = input<ResultadoEnum | null>(null);
    readonly resetEvent = output<void>();

    textoResultado = computed(() => {
        const resultadoValue = this.resultado();

        if (!resultadoValue) {
            return;
        }

        const resultado: Record<ResultadoEnum, string> = {
            [ResultadoEnum.Jogador]: 'YOU WIN',
            [ResultadoEnum.Computador]: 'YOU LOSE',
            [ResultadoEnum.Empate]: 'TIE GAME',
        };

        return resultado[resultadoValue];
    });

    readonly ResultadoEnum = ResultadoEnum;

    resetar(): void {
        this.resetEvent.emit();
    }
}
