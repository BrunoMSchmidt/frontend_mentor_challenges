import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { GameComponent } from './game.component'
import { GameJogadaComponent } from './game-jogada/game-jogada.component'
import { GameHeaderComponent } from './game-header/game-header.component'
import { GameEscolhaCircleComponent } from './game-escolha-circle/game-escolha-circle.component'
import { GameEscolhasComponent } from './game-escolhas/game-escolhas.component'

const routes = [
    {
        path: '',
        component: GameComponent,
    },
]

@NgModule({
    declarations: [
        GameComponent,
        GameJogadaComponent,
        GameHeaderComponent,
        GameEscolhaCircleComponent,
        GameEscolhasComponent,
    ],
    imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class RockPaperScissorsModule {}
