import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { LandingComponent } from './landing/landing.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AcceptFormComponent } from './accept-form/accept-form.component';
import { FullCalendarModule } from 'ng-fullcalendar';
import * as $ from 'jquery';
import { GooglePlacesDirective } from './shared/google-places.directive';
const appRoutes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'request-form', component: RequestFormComponent},
  {path: 'event-detail', component: EventDetailComponent},
  {path: 'accept-form', component: AcceptFormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    LandingComponent,
    EventDetailComponent,
    AcceptFormComponent,
    GooglePlacesDirective,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FullCalendarModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
