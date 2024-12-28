import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { Escolha } from '../game.component'

@Component({
    selector: 'app-game-escolhas',
    templateUrl: './game-escolhas.component.html',
    styleUrls: ['./game-escolhas.component.scss'],
    standalone: false
})
export class GameEscolhasComponent implements OnInit {
    public escolhasPossiveis: Escolha[] = ['papel', 'tesoura', 'pedra']
    @Output() escolha = new EventEmitter<Escolha>()

    constructor() {}

    ngOnInit(): void {}

    escolher(escolha: Escolha) {
        this.escolha.emit(escolha)
    }
}
