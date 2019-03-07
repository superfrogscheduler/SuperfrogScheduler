import { Component, OnInit, forwardRef } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
  providers: [AuthenticationService] 
})

export class AuthenticationComponent implements OnInit {

  superfrog = {
    id: "",
    email: "",
    created_at: "",
    updated_at: "",
    first_name: "",
    last_name: "",
    password : "",
    confirm_password: "",
  };

  data;

  edited: Boolean;
  baseurl = 'This is homepage url'
  alert = 'This is alert';

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.superfrog = {
      id: '',
      email: '',
      created_at: '',
      updated_at: '',
      first_name: '',
      last_name: '',
      password : '',
      confirm_password: '',
    };
    this.baseurl = "http://127.0.0.1:8000/";
    this.edited =  false;
  }

  //register Superfrog user 
  //when move use a different service and move the method from loginService to the corresponding service 
  onRegister() {
    this.authService.registerSuperfrog(this.superfrog).subscribe(
      response =>{
        console.log(response)
        alert ('User ' + this.superfrog.email + ' has been registered') 
      }, 
      error => console.log('error', error)
    );
  }
  
  onLogin() {
    this.authService.loginSuperfrog(this.superfrog).subscribe(
      response =>{
        this.superfrog = response
        this.alert = 'Welcome ' + this.superfrog.first_name
        this.edited = true
        //navigate to homepage
        this.router.navigate(['/list-appearances'])
      }, 
      error => {
        this.alert = 'Email/Password combination is invalid'
        this.edited = true
      }
    );
  }

}