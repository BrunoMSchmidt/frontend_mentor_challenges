import { Component, OnInit } from '@angular/core'

export type Escolha = 'pedra' | 'papel' | 'tesoura'
export type Tela = 'escolha' | 'jogada'
export type Resultado = -1 | 0 | 1

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
    telaAtual: Tela = 'escolha'
    jogador: Escolha | null = null
    computador: Escolha | null = null
    resultado: Resultado | null = null
    score: number = 0

    constructor() {}

    ngOnInit(): void {}

    escolher(escolha: 'pedra' | 'papel' | 'tesoura') {
        this.telaAtual = 'jogada'
        this.jogador = escolha

        setTimeout(() => {
            this.handleJogada()
        }, 650)
    }

    handleJogada() {
        this.computador = this.getEscolhaDoComputador()
        this.resultado = this.checarSeGanhou()
        if (this.resultado === 1) {
            this.score = this.score + 1
        } else if (this.resultado === -1) {
            this.score = Math.max(this.score - 1, 0)
        }
    }

    resetar() {
        ;(this.telaAtual = 'escolha'),
            (this.computador = null),
            (this.jogador = null),
            (this.resultado = null)
    }

    getEscolhaDoComputador(): Escolha {
        const escolhasPossíveis = ['pedra', 'papel', 'tesoura']
        const randomIndex = Math.floor(Math.random() * (2 - 0 + 1)) + 0
        return escolhasPossíveis[randomIndex] as any
    }

    checarSeGanhou(): -1 | 0 | 1 | null {
        if (!(this.jogador && this.computador)) return null
        if (this.jogador === this.computador) {
            return 0
        }
        let result: number
        switch (this.jogador) {
            case 'papel':
                result = this.computador === 'pedra' ? 1 : -1
                break
            case 'tesoura':
                result = this.computador === 'papel' ? 1 : -1
                break
            case 'pedra':
                result = this.computador === 'tesoura' ? 1 : -1
                break
        }
        return result as any
    }
}
