import { SidebarService } from '../../services/sidebar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject, Signal, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    animations: [
        trigger('slideFromLeft', [
            state(
                'hidden',
                style({
                    transform: 'translateX(-320px)',
                }),
            ),
            state(
                'visible',
                style({
                    transform: 'translateX(0px)',
                }),
            ),
            transition('hidden <=> visible', [animate('0.2s')]),
        ]),
        trigger('overlayAppear', [
            transition('void => *', [style({ backgroundColor: 'rgba(0,0,0,0)' }), animate(200)]),
            transition('* => void', [animate(200, style({ backgroundColor: 'rgba(0,0,0,0)' }))]),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, RouterLinkActive],
    standalone: true
})
export class SidebarComponent {
    private sidebarService = inject(SidebarService);
    private authService = inject(AuthService);

    isOpen: Signal<boolean>;
    isAuthenticated: Signal<boolean>;
    showLogoutConfirm = signal(false);
    isLoggingOut = signal(false);

    constructor() {
        this.isOpen = this.sidebarService.isOpen;
        this.isAuthenticated = this.authService.isAuthenticated;
    }

    toggleSidebar(): void {
        this.sidebarService.toggle();
    }

    showLogoutModal(): void {
        this.showLogoutConfirm.set(true);
    }

    cancelLogout(): void {
        this.showLogoutConfirm.set(false);
    }

    async logout(): Promise<void> {
        this.showLogoutConfirm.set(false);
        this.isLoggingOut.set(true);
        
        try {
            await this.authService.logout();
            this.toggleSidebar();
        } finally {
            this.isLoggingOut.set(false);
        }
    }
}
