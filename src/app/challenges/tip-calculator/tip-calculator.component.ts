import { Component, OnInit } from '@angular/core'
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-tip-calculator',
    templateUrl: './tip-calculator.component.html',
    styleUrls: ['./tip-calculator.component.scss'],
})
export class TipCalculatorComponent {
    percentages: number[] = [5, 10, 15, 25, 50]

    result = {
        tipPerPerson: 0,
        totalPerPerson: 0,
    }

    form: UntypedFormGroup

    get bill(): UntypedFormControl {
        return <UntypedFormControl>this.form.get('bill')
    }

    get tipPercent(): UntypedFormControl {
        return <UntypedFormControl>this.form.get('tipPercent')
    }

    get people(): UntypedFormControl {
        return <UntypedFormControl>this.form.get('people')
    }

    subscriptions: Subscription[] = []

    constructor(private fb: UntypedFormBuilder) {
        this.form = this.fb.group({
            bill: [null, [Validators.required, Validators.min(1)]],
            tipPercent: [null, [Validators.min(0)]],
            people: [
                null,
                [
                    Validators.required,
                    Validators.min(1),
                    Validators.pattern('^\\d+$'),
                ],
            ],
        })

        this.subscriptions.push(
            this.form.valueChanges.subscribe((values) => {
                this.calculate(values)
            })
        )
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subscription) => subscription.unsubscribe())
    }

    isFieldInvalid(field: UntypedFormControl) {
        return field.invalid && (field.touched || field.dirty)
    }

    calculate(values: { bill: number; tipPercent: number; people: number }) {
        const bill = values.bill
        const tipPercent = values.tipPercent
        const people = values.people

        if (bill * people != 0 && this.form.valid) {
            this.result.tipPerPerson = (bill * tipPercent) / 100 / people
            this.result.totalPerPerson =
                bill / people + this.result.tipPerPerson
        } else {
            this.resetResult()
        }
    }

    resetForm() {
        this.form.reset()
        this.resetResult()
    }

    resetResult() {
        this.result.totalPerPerson = 0
        this.result.tipPerPerson = 0
    }
}
