import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SuiAccordionModule, SuiModule, SuiSidebarModule } from 'ng2-semantic-ui';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChallengesModule } from './challenges/challenges.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DpDatePickerModule } from 'ng2-date-picker';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChallengesModule,
    SuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
