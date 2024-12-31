import { ChangeDetectionStrategy, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, PercentPipe } from '@angular/common';

@Component({
    selector: 'app-tip-calculator',
    templateUrl: './tip-calculator.component.html',
    styleUrls: ['./tip-calculator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormsModule, NgClass, PercentPipe],
})
export class TipCalculatorComponent {
    private readonly tipCustomInput = viewChild<ElementRef<HTMLInputElement>>('tipCustomInput');

    percentages: number[] = [5, 10, 15, 25, 50];

    bill = signal<number | null>(null);
    tipPercent = signal<number>(0);
    people = signal<number | null>(null);

    billError = computed(() => this.getErrorMessage(this.bill()));
    tipPercentError = computed(() => this.getErrorMessage(this.tipPercent(), true));
    peopleError = computed(() => this.getErrorMessage(this.people()));

    result = computed(() => {
        const bill = this.bill();
        const tipPercent = this.tipPercent();
        const people = this.people();

        if (bill === null || tipPercent === null || people === null) {
            return {
                tipPerPerson: 0,
                totalPerPerson: 0,
            };
        }

        const tipAmount = (bill * tipPercent) / 100;
        const tipPerPerson = tipAmount / people;
        const totalPerPerson = (bill + tipAmount) / people;

        return {
            tipPerPerson: tipPerPerson,
            totalPerPerson: totalPerPerson,
        };
    });

    updatePercentageAndResetInput(percentage: number): void {
        this.updatePercentage(percentage);

        const tipCustomInputElement = this.tipCustomInput();

        if (tipCustomInputElement) {
            tipCustomInputElement.nativeElement.value = '';
        }
    }

    updatePercentage(percentage: number): void {
        this.tipPercent.set(percentage);
    }

    resetForm(): void {
        this.bill.set(0);
        this.tipPercent.set(0);
        this.people.set(0);
    }

    private getErrorMessage(value: number | null, allowZero = false): string | null {
        if (value === null) {
            return null;
        }

        if (value === 0 && !allowZero) {
            return "Can't be zero";
        }

        if (value < 0) {
            return "Can't be negative";
        }

        return null;
    }
}
