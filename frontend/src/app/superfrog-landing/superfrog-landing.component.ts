import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Superfrog } from '../shared/superfrog';
import { Router } from '@angular/router';
import { SuperfrogLandingService } from './superfrog-landing.component.service';
import { SignUpService } from '../super-frog-signup/super-frog-signup.service';

@Component({
  selector: 'app-superfrog-landing',
  templateUrl: './superfrog-landing.component.html',
  styleUrls: ['./superfrog-landing.component.css'],
  providers: [AuthenticationService, SignUpService]
})
export class SuperfrogLandingComponent implements OnInit {

  superfrog: Superfrog; //Superfrog object
  landingData = []; //Array used to holds the appearance data
  superfrogID: number; //The superfrog user ID.
  constructor(private authService: AuthenticationService, private landService: SuperfrogLandingService) { }

  ngOnInit() {
    this.superfrog = {};
    this.authService.isAccessible(2);
    this.getUser();
    this.getSuperFrogId();
    this.getAppearances();
  }

  getUser() {//Get the current Superfrog logged in. Used to display username when reaching landing page
    this.superfrog = this.authService.getUser('logged');
  } //Get the user id of the Superfrog currently logged i
  getSuperFrogId() {
    this.superfrogID = this.authService.getUser('logged').user.id;
  }
  getAppearances() {//Get the current logged in Superfrog's assigned appearances and display on the landing page
    this.landService.getAppearances('Assigned', this.superfrogID).subscribe(data => {
      this.landingData = data;
    });
  }



}
