import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Superfrog } from '../shared/superfrog';
import { SuperfrogLandingService } from './superfrog-landing.component.service';
import { SignUpService } from '../super-frog-signup/super-frog-signup.service';

@Component({
  selector: 'app-superfrog-landing',
  templateUrl: './superfrog-landing.component.html',
  styleUrls: ['./superfrog-landing.component.css'],
  providers: [AuthenticationService, SignUpService]
})
export class SuperfrogLandingComponent implements OnInit {

  superfrog: Superfrog;
  landingData = [];
  superfrogID: number;
  constructor(private authService: AuthenticationService, private landService: SuperfrogLandingService) { }

  ngOnInit() {
    this.superfrog = {};
    this.getUser();
    this.getSuperFrogId();
    this.getAppearances();
  }

  getUser() {
    this.superfrog = this.authService.getUser('logged');
  }
  getSuperFrogId() {
    this.superfrogID = this.authService.getUser('logged').id;
  }
  getAppearances() {
    this.landService.getAppearances('Assigned', this.superfrogID).subscribe(data => {
      this.landingData = data;
    });
  }
}
