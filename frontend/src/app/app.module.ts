import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { FullCalendarModule } from 'ng-fullcalendar';

import { AppComponent } from './app.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { LandingComponent } from './landing/landing.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { AcceptFormComponent } from './accept-form/accept-form.component';
import { CustomerConfirmationComponent } from './customer-confirmation/customer-confirmation.component';
import { LoginComponent } from './login/login.component';
import { RequestListComponent } from './request-list/request-list.component';
import { SuperfrogLandingComponent } from './superfrog-landing/superfrog-landing.component';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { SuperFrogSignupComponent } from './super-frog-signup/super-frog-signup.component';
import { ListAppearancesComponent } from './list-appearances/list-appearances.component';
import { ViewAppearancesComponent } from './view-appearances/view-appearances.component';
import { AppearanceDetailComponent } from './appearance-detail/appearance-detail.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ListAcceptRejectComponent } from './list-accept-reject/list-accept-reject.component';
import * as $ from 'jquery';
import { GooglePlacesDirective } from './shared/google-places.directive';
import { SuperfrogCalendarComponent } from './superfrog-calendar/superfrog-calendar.component';
import { EventCodeComponent } from './event-code/event-code.component';
import { AcceptRejectDetailsComponent } from './accept-reject-details/accept-reject-details.component';
import { AngularWebStorageModule } from 'angular-web-storage';
import { SuperfrogClassScheduleComponent } from './superfrog-class-schedule/superfrog-class-schedule/superfrog-class-schedule.component';

const appRoutes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'request-form', component: RequestFormComponent},
  {path: 'event-detail', component: EventDetailComponent},
  {path: 'accept-form', component: AcceptFormComponent},
  {path: 'customer-confirmation', component: CustomerConfirmationComponent },
  {path: 'request-list', component: RequestListComponent},
  {path: 'superfrog-landing', component: SuperfrogLandingComponent},
  {path: 'admin-landing', component: AdminLandingComponent},
  {path: 'sign-up/:id', component: SuperFrogSignupComponent},
  {path: 'list-appearances', component: ListAppearancesComponent},
  {path: 'view-appearance', component: ViewAppearancesComponent},
  {path: 'superfrog-calendar', component: SuperfrogCalendarComponent},
  {path: 'event-code', component: EventCodeComponent},
  {path: 'appearance-details/:id', component: AppearanceDetailComponent},
  {path: 'auth', component: AuthenticationComponent},
  { path: 'list-accept-reject',  component: ListAcceptRejectComponent },
  { path: 'accept-reject-details/:id',component: AcceptRejectDetailsComponent},
  { path: 'superfrog-class-schedule', component: SuperfrogClassScheduleComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RequestFormComponent,
    LandingComponent,
    EventDetailComponent,
    AcceptFormComponent,
    CustomerConfirmationComponent,
    LoginComponent,
    RequestListComponent,
    SuperfrogLandingComponent,
    AdminLandingComponent,
    GooglePlacesDirective,
    SuperFrogSignupComponent,
    ListAppearancesComponent,
    ViewAppearancesComponent,
    AppearanceDetailComponent,
    AuthenticationComponent,
    SuperfrogCalendarComponent,
    EventCodeComponent,
    ListAcceptRejectComponent,
    AcceptRejectDetailsComponent,
    SuperfrogClassScheduleComponent,
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
    HttpClientModule,
    FullCalendarModule,

    AngularWebStorageModule,

    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
