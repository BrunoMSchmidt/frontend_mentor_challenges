import { Escolha } from '../game.component'
import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-game-escolha-circle',
    templateUrl: './game-escolha-circle.component.html',
    styleUrls: ['./game-escolha-circle.component.scss'],
    standalone: false
})
export class GameEscolhaCircleComponent implements OnInit {
    @Input() escolha: Escolha | null = null
    @Input() clickable = true
    @Input() size = 120
    @Input() highlight = false

    constructor() {}

    ngOnInit(): void {}
}
