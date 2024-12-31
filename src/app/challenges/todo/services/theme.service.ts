import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private isDarkModeSignal = signal<boolean>(window.matchMedia('(prefers-color-scheme: dark)').matches);

    get isDarkMode(): Signal<boolean> {
        return this.isDarkModeSignal.asReadonly();
    }

    switchTheme(): void {
        this.isDarkModeSignal.set(!this.isDarkModeSignal());
    }
}
