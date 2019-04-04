import { Component, OnInit, forwardRef } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';
import { Superfrog } from '../shared/superfrog';
import { User } from '../shared/user';
import { Admin } from '../shared/admin';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [AuthenticationService] 
})

export class AuthenticationComponent implements OnInit {

  user: User;
  superfrog: Superfrog;
  admin: Admin;
  data;

  isAdmin: boolean;
  edited: boolean;
  baseurl = 'This is homepage url'
  alert = 'This is alert';

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.user = {}
    this.baseurl = "http://3.94.88.53:800/";
    this.alert = '';
    this.edited =  false;
    this.isAdmin = false;
  }

  //register Superfrog user 
  //when move use a different service and move the method from loginService to the corresponding service 
  onRegister() {
    this.authService.registerSuperfrog(this.user).subscribe(
      response =>{
        console.log(response)
      }, 
      error => console.log('error', error)
    );
  }
  
  onLogin() {
    this.authService.loginUser(this.user).subscribe(
      response =>{
        this.user = response 
        //this.authService.setUser(this.user)
        //navigate to homepage

        if (this.user.is_admin && this.user.is_staff){

          this.authService.getAdmin(this.user.id).subscribe(
            response => {
              this.admin = response
              this.authService.setUser(this.admin, 1)
              this.router.navigate(['/admin-landing'])
            }
          );

          
        } else if (!this.user.is_admin && this.user.is_staff) {
          if (this.isAdmin == true) {
            this.authService.getAdmin(this.user.id).subscribe(
              response => {
                this.admin = response
                this.authService.setUser(this.admin, 1)
                this.router.navigate(['/admin-landing'])
              }
            );

          } else {
            this.authService.getSuperFrog(this.user.id).subscribe(
              response => {
                this.superfrog = response
                this.authService.setUser(this.superfrog, 2)
                this.router.navigate(['/superfrog-landing'])
              }
            );
            
          }
        } else {
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