import { SidebarComponent } from './sidebar/components/sidebar/sidebar.component';
import { SidebarService } from './sidebar/services/sidebar.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, SidebarComponent],
    standalone: true
})
export class AppComponent {
    private sidebarService = inject(SidebarService);
    private authService = inject(AuthService);
    
    protected isAuthenticated = this.authService.isAuthenticated;

    toggleSidebar(): void {
        this.sidebarService.toggle();
    }
}
