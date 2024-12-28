import { animate, style, transition, trigger } from '@angular/animations'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Escolha, Resultado } from '../game.component'

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
    standalone: false
})
export class GameJogadaComponent implements OnInit {
    @Input() jogador: Escolha | null = null
    @Input() computador: Escolha | null = null
    @Input() resultado: Resultado | null = null
    @Output() reset = new EventEmitter<void>()

    constructor() {}

    ngOnInit(): void {}

    resetar() {
        this.reset.emit()
    }

    getResultText() {
        if (this.resultado === null) {
            return
        }
        if (this.resultado < 0) {
            return 'YOU LOSE'
        } else if (this.resultado > 0) {
            return 'YOU WIN'
        } else {
            return 'TIE GAME'
        }
    }
}
