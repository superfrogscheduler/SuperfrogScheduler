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
    email: "",
    password : ""
  };

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.superfrog = {
      email: '', 
      password: ''
    };
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
        alert ('User ' + this.superfrog.email + ' has login') 
      }, 
      error => console.log('error', error)
    );
  }

}