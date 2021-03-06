import { Component, OnInit } from '@angular/core';
import { LogoutService } from './logout.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';
import { Superfrog } from '../shared/superfrog';
import { User } from '../shared/user';
import { Admin } from '../shared/admin';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  providers: [LogoutService, AuthenticationService] 
})
export class LogoutComponent implements OnInit {

  constructor(private logoutSer: LogoutService, private authSer: AuthenticationService, private router: Router, private navbarService: NavbarService,) {
    if(this.authSer.getLoggedInStatus() == 0 ) {
      this.router.navigate([''])
    }
  }

  ngOnInit() {
    this.logoutSer.logoutUser(this.authSer.getUser('logged')).subscribe(
      response => {
        this.navbarService.updateLoginStatus(false)
        this.authSer.clearStorage()
      },
      error => {
      }
    );
  } 

}
