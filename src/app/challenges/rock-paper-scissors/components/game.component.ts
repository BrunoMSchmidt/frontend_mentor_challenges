import { GameEscolhasComponent } from './game-escolhas/game-escolhas.component';
import { GameHeaderComponent } from './game-header/game-header.component';
import { GameJogadaComponent } from './game-jogada/game-jogada.component';
import { EscolhaEnum } from '../enums/escolha.enum';
import { ResultadoEnum } from '../enums/resultado.enum';
import { TelaEnum } from '../enums/tela.enum';

import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    imports: [GameHeaderComponent, GameEscolhasComponent, GameJogadaComponent],
})
export class GameComponent {
    telaAtual: TelaEnum = TelaEnum.Escolha;
    resultado: ResultadoEnum | null = null;

    escolhaJogador: EscolhaEnum | null = null;
    escolhaComputador: EscolhaEnum | null = null;

    score = 0;

    readonly TelaEnum = TelaEnum;

    escolher(escolha: EscolhaEnum): void {
        this.telaAtual = TelaEnum.Jogada;
        this.escolhaJogador = escolha;
        this.escolhaComputador = this.gerarEscolhaDoComputador();

        timer(500)
            .pipe(take(1))
            .subscribe(() => this.handleJogada());
    }

    handleJogada(): void {
        this.resultado = this.checarSeGanhou();

        if (this.resultado === ResultadoEnum.Jogador) {
            this.score = this.score + 1;

            return;
        }

        if (this.resultado === ResultadoEnum.Computador) {
            this.score = Math.max(this.score - 1, 0);
        }
    }

    resetar(): void {
        this.telaAtual = TelaEnum.Escolha;
        this.escolhaJogador = null;
        this.resultado = null;
    }

    private gerarEscolhaDoComputador(): EscolhaEnum {
        const escolhasPossíveis: EscolhaEnum[] = Object.values(EscolhaEnum);

        // eslint-disable-next-line sonarjs/pseudo-random
        return escolhasPossíveis[Math.floor(Math.random() * escolhasPossíveis.length)];
    }

    checarSeGanhou(): ResultadoEnum {
        if (this.escolhaJogador === this.escolhaComputador) {
            return ResultadoEnum.Empate;
        }

        if (
            (this.escolhaJogador === EscolhaEnum.Pedra && this.escolhaComputador === EscolhaEnum.Tesoura) ||
            (this.escolhaJogador === EscolhaEnum.Papel && this.escolhaComputador === EscolhaEnum.Pedra) ||
            (this.escolhaJogador === EscolhaEnum.Tesoura && this.escolhaComputador === EscolhaEnum.Papel)
        ) {
            return ResultadoEnum.Jogador;
        }

        return ResultadoEnum.Computador;
    }
}
