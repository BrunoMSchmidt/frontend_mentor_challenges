import { SidebarService } from '../../services/sidebar.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

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
})
export class SidebarComponent {
    private sidebarService = inject(SidebarService);

    isOpen: Signal<boolean>;

    constructor() {
        this.isOpen = this.sidebarService.isOpen;
    }

    toggleSidebar(): void {
        this.sidebarService.toggle();
    }
}
