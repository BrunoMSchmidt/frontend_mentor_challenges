import { SidebarComponent } from './sidebar/sidebar.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, SidebarComponent],
})
export class AppComponent {}
