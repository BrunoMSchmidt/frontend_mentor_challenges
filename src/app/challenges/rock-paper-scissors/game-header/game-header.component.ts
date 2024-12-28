import { Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-game-header',
    templateUrl: './game-header.component.html',
    styleUrls: ['./game-header.component.scss'],
    standalone: false
})
export class GameHeaderComponent implements OnInit {
    @Input() score!: number

    constructor() {}

    ngOnInit(): void {}
}
