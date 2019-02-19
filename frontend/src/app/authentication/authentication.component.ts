import { Component, OnInit, forwardRef } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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

  alert = 'This is alert';

  constructor(private authService: AuthenticationService) {}

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
        this.alert = 'User has logged in' 
        this.edited = true
      }, 
      error => {
        this.alert = 'Email/Password combination is invalid'
        this.edited = true
      }
    );
  }

}