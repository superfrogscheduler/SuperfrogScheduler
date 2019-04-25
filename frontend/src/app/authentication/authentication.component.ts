import { Component, OnInit, forwardRef } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Superfrog } from '../shared/superfrog';
import { User } from '../shared/user';
import { Admin } from '../shared/admin';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [AuthenticationService] 
})

export class AuthenticationComponent implements OnInit {

  isLoggedIn = false;
  role = '';
  user: User;
  superfrog: Superfrog;
  admin: Admin;
  data;

  isAdmin: boolean;
  edited: boolean;
  baseurl = environment.apiURL;
  alert = 'This is alert';

  constructor(private authService: AuthenticationService, private router: Router, private navbarService: NavbarService) {
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  ngOnInit() {
    this.user = {}

    if (this.authService.isLoggedIn == 1)
      this.router.navigate(['/admin-landing'])
    else if (this.authService.isLoggedIn == 2)
    this.router.navigate(['/superfrog-landing'])
    

    this.alert = '';
    this.edited =  false;
    this.isAdmin = false;
  }
  
  onLogin() {
    this.authService.loginUser(this.user).subscribe(
      response =>{
        this.user = response 
        //this.authService.setUser(this.user)
        //navigate to homepage

        if (this.user.is_admin){
          this.navbarService.updateNavAfterAuth('admin');
          this.navbarService.updateLoginStatus(true);
          this.role = 'admin';
          this.authService.getAdmin(this.user.id).subscribe(
            
            response => {
              this.admin = response
              this.authService.setUser(this.admin, 1)
              this.router.navigate(['/admin-landing'])
            }
          );

          
        } else if (this.user.is_staff) {
          if (this.isAdmin == true) {
            this.navbarService.updateNavAfterAuth('admin');
            this.navbarService.updateLoginStatus(true);
            this.role = 'admin';
            this.authService.getAdmin(this.user.id).subscribe(
              response => {
                this.admin = response
                this.authService.setUser(this.admin, 1)
                this.router.navigate(['/admin-landing'])
              }
            );

          } else {
            this.navbarService.updateNavAfterAuth('user');
            this.navbarService.updateLoginStatus(true);
            this.role = 'user';

            this.authService.getSuperFrog(this.user.id).subscribe(
              response => {
                this.superfrog = response
                this.authService.setUser(this.superfrog, 2)
                this.router.navigate(['/superfrog-landing'])
              }
            );
            
          }
        } else {
          this.navbarService.updateNavAfterAuth('user');
          this.navbarService.updateLoginStatus(true);
          this.role = 'user';
          
          this.authService.getSuperFrog(this.user.id).subscribe(
            response => {
              this.superfrog = response
              this.authService.setUser(this.superfrog, 2)
              this.router.navigate(['/superfrog-landing'])
            }
          );
          
        }

      }, 
      error => {
        this.alert = 'Email/Password combination is invalid'
        this.edited = true
      }
    );
  }

}