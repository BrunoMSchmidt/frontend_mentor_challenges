import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChallengesModule } from './challenges/challenges.module'
import { SidebarComponent } from './sidebar/sidebar.component'

@NgModule({
    declarations: [AppComponent, SidebarComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ChallengesModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
