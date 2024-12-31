import { GameEscolhaCircleComponent } from '../game-escolha-circle/game-escolha-circle.component';
import { EscolhaEnum } from '../../enums/escolha.enum';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-game-escolhas',
    templateUrl: './game-escolhas.component.html',
    styleUrls: ['./game-escolhas.component.scss'],
    imports: [NgFor, GameEscolhaCircleComponent],
})
export class GameEscolhasComponent {
    public escolhasPossiveis: EscolhaEnum[] = Object.values(EscolhaEnum);
    @Output() escolha = new EventEmitter<EscolhaEnum>();

    escolher(escolha: EscolhaEnum): void {
        this.escolha.emit(escolha);
    }
}
