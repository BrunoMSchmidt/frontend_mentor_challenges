import { GameEscolhasComponent } from './game-escolhas/game-escolhas.component';
import { GameHeaderComponent } from './game-header/game-header.component';
import { GameJogadaComponent } from './game-jogada/game-jogada.component';
import { EscolhaEnum } from '../enums/escolha.enum';
import { ResultadoEnum } from '../enums/resultado.enum';
import { TelaEnum } from '../enums/tela.enum';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GameHeaderComponent, GameEscolhasComponent, GameJogadaComponent],
})
export class GameComponent {
    telaAtual = signal<TelaEnum>(TelaEnum.Escolha);
    resultado = signal<ResultadoEnum | null>(null);

    escolhaJogador = signal<EscolhaEnum | null>(null);
    escolhaComputador = signal<EscolhaEnum | null>(null);

    score = signal<number>(0);

    readonly TelaEnum = TelaEnum;

    escolher(escolha: EscolhaEnum): void {
        this.telaAtual.set(TelaEnum.Jogada);
        this.escolhaJogador.set(escolha);
        this.escolhaComputador.set(this.gerarEscolhaDoComputador());

        timer(500)
            .pipe(take(1))
            .subscribe(() => this.handleJogada());
    }

    handleJogada(): void {
        const resultado = this.checarSeGanhou();
        this.resultado.set(resultado);

        if (resultado === ResultadoEnum.Jogador) {
            this.score.set(this.score() + 1);
            return;
        }

        if (resultado === ResultadoEnum.Computador) {
            this.score.set(Math.max(this.score() - 1, 0));
        }
    }

    resetar(): void {
        this.telaAtual.set(TelaEnum.Escolha);
        this.escolhaJogador.set(null);
        this.resultado.set(null);
    }

    private gerarEscolhaDoComputador(): EscolhaEnum {
        const escolhasPossíveis: EscolhaEnum[] = Object.values(EscolhaEnum);
        // eslint-disable-next-line sonarjs/pseudo-random
        return escolhasPossíveis[Math.floor(Math.random() * escolhasPossíveis.length)];
    }

    checarSeGanhou(): ResultadoEnum {
        const escolhaJogador = this.escolhaJogador();
        const escolhaComputador = this.escolhaComputador();

        if (escolhaJogador === escolhaComputador) {
            return ResultadoEnum.Empate;
        }

        if (
            (escolhaJogador === EscolhaEnum.Pedra && escolhaComputador === EscolhaEnum.Tesoura) ||
            (escolhaJogador === EscolhaEnum.Papel && escolhaComputador === EscolhaEnum.Pedra) ||
            (escolhaJogador === EscolhaEnum.Tesoura && escolhaComputador === EscolhaEnum.Papel)
        ) {
            return ResultadoEnum.Jogador;
        }

        return ResultadoEnum.Computador;
    }
}
