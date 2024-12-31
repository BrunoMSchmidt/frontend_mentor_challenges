import { SidebarComponent } from './sidebar/components/sidebar/sidebar.component';
import { SidebarService } from './sidebar/services/sidebar.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, SidebarComponent],
})
export class AppComponent {
    private sidebarService = inject(SidebarService);

    toggleSidebar(): void {
        this.sidebarService.toggle();
    }
}
