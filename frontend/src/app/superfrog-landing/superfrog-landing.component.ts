import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Superfrog } from '../shared/superfrog';

@Component({
  selector: 'app-superfrog-landing',
  templateUrl: './superfrog-landing.component.html',
  styleUrls: ['./superfrog-landing.component.css'],
  providers: [AuthenticationService] 
})
export class SuperfrogLandingComponent implements OnInit {

  superfrog: Superfrog;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.superfrog = {};
    this.getUser()
  }

  getUser(){
    this.superfrog = this.authService.getUser('logged')
  }

}
