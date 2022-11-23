import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { TipCalculatorComponent } from './tip-calculator.component'

const routes = [
    {
        path: '',
        component: TipCalculatorComponent,
    },
]

@NgModule({
    declarations: [TipCalculatorComponent],
    imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class TipCalculatorModule {}
