import { Component, OnInit, forwardRef } from '@angular/core';
import { LoginService } from './login.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => LoginComponent),
    multi: true
  }]
})
export class LoginComponent implements OnInit {

  login;
  input = {'username': String, 'password': String}

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.login = {
      //username = '',
      //password = '',
    }
  }

  //register Superfrog user 
  //when move use a different service and move the method from loginService to the corresponding service 
  registerSuperfrog() {
    this.loginService.registerSuperfrog(this.login).subscribe(
      response =>{
        alert ('User ' + this.login.username + ' has been registered') 
      }, 
      error => console.log('error', error)
    );
  }
  
}
