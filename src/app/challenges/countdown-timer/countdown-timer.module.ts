import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { CountdownTimerComponent } from './countdown-timer.component'

const routes = [
    {
        path: '',
        component: CountdownTimerComponent,
    },
]

@NgModule({
    declarations: [CountdownTimerComponent],
    imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class CountdownTimerModule {}
