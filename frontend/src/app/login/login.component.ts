import { Component, OnInit, forwardRef } from '@angular/core';
import { LoginService } from './login.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService] 
})
export class LoginComponent implements OnInit {

  superfrog = {
    username: "",
    password : ""
  };

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.superfrog = {
      username: '', 
      password: ''
    };
  }

  //register Superfrog user 
  //when move use a different service and move the method from loginService to the corresponding service 
  onRegister() {
    this.loginService.registerSuperfrog(this.superfrog).subscribe(
      response =>{
        console.log(response)
        alert ('User ' + this.superfrog.username + ' has been registered') 
      }, 
      error => console.log('error', error)
    );
  }
  
  onLogin() {
    this.loginService.loginSuperfrog(this.superfrog).subscribe(
      response =>{
        alert ('User ' + this.superfrog.username + ' has login') 
      }, 
      error => console.log('error', error)
    );
  }

}