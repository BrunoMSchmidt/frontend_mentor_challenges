import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ChallengesModule } from './challenges/challenges.module'

const routes: Routes = [
    {
        path: 'challenges',
        loadChildren: () =>
            import('./challenges/challenges.module').then(
                (m) => ChallengesModule
            ),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
