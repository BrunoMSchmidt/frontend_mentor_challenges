import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SidebarService {
    private isOpenSignal = signal<boolean>(false);

    get isOpen(): Signal<boolean> {
        return this.isOpenSignal.asReadonly();
    }

    toggle(): void {
        this.isOpenSignal.set(!this.isOpenSignal());
    }
}
