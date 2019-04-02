import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Superfrog } from '../shared/superfrog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superfrog-landing',
  templateUrl: './superfrog-landing.component.html',
  styleUrls: ['./superfrog-landing.component.css'],
  providers: [AuthenticationService] 
})
export class SuperfrogLandingComponent implements OnInit {

  superfrog: Superfrog;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.superfrog = {}
    this.authService.isAccessible(2)
    this.getUser()
  }

  getUser(){
    this.superfrog = this.authService.getUser('logged')
  }



}
