import { Component, OnDestroy } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
    ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgIf, NgClass, NgFor, PercentPipe } from '@angular/common';

@Component({
    selector: 'app-tip-calculator',
    templateUrl: './tip-calculator.component.html',
    styleUrls: ['./tip-calculator.component.scss'],
    imports: [ReactiveFormsModule, NgIf, NgClass, NgFor, PercentPipe],
})
export class TipCalculatorComponent implements OnDestroy {
    percentages: number[] = [5, 10, 15, 25, 50];

    result = {
        tipPerPerson: 0,
        totalPerPerson: 0,
    };

    form: UntypedFormGroup;

    get bill(): UntypedFormControl {
        return this.form.get('bill') as UntypedFormControl;
    }

    get tipPercent(): UntypedFormControl {
        return this.form.get('tipPercent') as UntypedFormControl;
    }

    get people(): UntypedFormControl {
        return this.form.get('people') as UntypedFormControl;
    }

    subscriptions: Subscription[] = [];

    constructor(private fb: UntypedFormBuilder) {
        this.form = this.fb.group({
            bill: [null, [Validators.required, Validators.min(1)]],
            tipPercent: [null, [Validators.min(0)]],
            people: [null, [Validators.required, Validators.min(1), Validators.pattern('^\\d+$')]],
        });

        this.subscriptions.push(
            this.form.valueChanges.subscribe(values => {
                this.calculate(values);
            }),
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    isFieldInvalid(field: UntypedFormControl): boolean {
        return field.invalid && (field.touched || field.dirty);
    }

    calculate(values: { bill: number; tipPercent: number; people: number }): void {
        const bill = values.bill;
        const tipPercent = values.tipPercent;
        const people = values.people;

        if (bill * people != 0 && this.form.valid) {
            this.result.tipPerPerson = (bill * tipPercent) / 100 / people;
            this.result.totalPerPerson = bill / people + this.result.tipPerPerson;
        } else {
            this.resetResult();
        }
    }

    resetForm(): void {
        this.form.reset();
        this.resetResult();
    }

    resetResult(): void {
        this.result.totalPerPerson = 0;
        this.result.tipPerPerson = 0;
    }
}
