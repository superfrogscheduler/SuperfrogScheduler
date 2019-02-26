import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { getSymbolIterator } from '@angular/core/src/util';
import {SuperFrog} from './shared/superfrog';
import {AuthenticationService} from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  superfrog : SuperFrog;
  logged: boolean;
  constructor(private api: ApiService, private authService: AuthenticationService ) {
    this.getSites();
    this.getUser();
  }

  getSites = () => {
    this.api.getSite().subscribe(
      data => {
        this.superfrog = data
      },
      error => {
        console.log(error);
      }
    );
  }

  getUser() {
    this.superfrog = this.authService.getUser('logged')
    if (this.superfrog != null) {
      this.logged = true
    } else this.logged = false
  }
}
