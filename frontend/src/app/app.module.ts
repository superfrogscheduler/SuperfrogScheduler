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
import { ListPayrollAppearancesComponent } from './list-payroll-appearances/list-payroll-appearances.component';
import { AdminGeneratePayrollComponent } from './admin-generate-payroll/admin-generate-payroll.component';
import { SuperfrogClassScheduleComponent } from './superfrog-class-schedule/superfrog-class-schedule/superfrog-class-schedule.component';
import { InstructionsPageComponent } from './instructions-page/instructions-page.component';
import { SuperfrogLandingDetailsComponent } from './superfrog-landing-details/superfrog-landing-details.component';
import { SuperfrogViewAssignedAppearancesComponent } from './superfrog-view-assigned-appearances/superfrog-view-assigned-appearances.component';
import { AdminViewAppearancesComponent } from './admin-view-appearances/admin-view-appearances.component';
import { AdminChangeAppearanceComponent } from './admin-change-appearance/admin-change-appearance.component';
import { SuperfrogAppearanceDetailsComponent } from './superfrog-appearance-details/superfrog-appearance-details.component';
import { ConfirmSignupComponent } from './confirm-signup/confirm-signup.component';
import { ConfirmRejectComponent } from './confirm-reject/confirm-reject.component';
import { ConfirmAcceptComponent } from './confirm-accept/confirm-accept.component';
import { AdminCreateAppearanceComponent } from './admin-create-appearance/admin-create-appearance.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminAppearancesDetailsComponent } from './admin-appearances-details/admin-appearances-details.component';
import { LogoutComponent } from './logout/logout.component';

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
  { path: 'accept-reject-details/:id', component: AcceptRejectDetailsComponent},
  { path: 'list-payroll-appearances', component: ListPayrollAppearancesComponent},
  { path: 'admin-generate-payroll/:id', component: AdminGeneratePayrollComponent},
  {path: 'instructions-page', component: InstructionsPageComponent},
  {path: 'superfrog-landing-details/:id', component: SuperfrogLandingDetailsComponent},
  { path: 'superfrog-class-schedule', component: SuperfrogClassScheduleComponent},
  { path: 'superfrog-view-assigned-appearances', component: SuperfrogViewAssignedAppearancesComponent},
  { path: 'admin-view-appearances', component: AdminViewAppearancesComponent},
  { path: 'admin-change-appearances/:id', component: AdminChangeAppearanceComponent},
  { path: 'superfrog-appearance-details/:id', component: SuperfrogAppearanceDetailsComponent},
  {path: 'instructions-page', component: InstructionsPageComponent},
  {path: 'confirm-accept', component: ConfirmAcceptComponent},
  {path: 'confirm-reject', component: ConfirmRejectComponent},
  {path: 'confirm-signup', component: ConfirmSignupComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'admin-create-appearance', component: AdminCreateAppearanceComponent},
  {path: 'admin-settings', component: AdminSettingsComponent},
  { path: 'admin-appearance-details', component: AdminAppearancesDetailsComponent}

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
    ListPayrollAppearancesComponent,
    AdminGeneratePayrollComponent,
    SuperfrogClassScheduleComponent,
    InstructionsPageComponent,
    SuperfrogLandingDetailsComponent,
    SuperfrogViewAssignedAppearancesComponent,
    AdminViewAppearancesComponent,
    AdminChangeAppearanceComponent,
    SuperfrogAppearanceDetailsComponent,
    ConfirmSignupComponent,
    ConfirmRejectComponent,
    ConfirmAcceptComponent,
    AdminCreateAppearanceComponent,
    AdminSettingsComponent,
    AdminAppearancesDetailsComponent,
    LogoutComponent,
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
