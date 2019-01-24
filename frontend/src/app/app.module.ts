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
import { SuperFrogSignupComponent } from './super-frog-signup/super-frog-signup.component';
import { ListAppearancesComponent } from './list-appearances/list-appearances.component';

const appRoutes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'request-form', component: RequestFormComponent},
  {path: 'event-detail', component: EventDetailComponent},
  {path: 'accept-form', component: AcceptFormComponent},
  {path: 'sign-up/:id', component: SuperFrogSignupComponent},
  { path: 'avail-appear', component: ListAppearancesComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    LandingComponent,
    EventDetailComponent,
    AcceptFormComponent,
    SuperFrogSignupComponent,
    ListAppearancesComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
