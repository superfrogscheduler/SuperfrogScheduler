import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { getSymbolIterator } from '@angular/core/src/util';
import { AuthenticationComponent } from './authentication/authentication.component';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit{
  superfrog = [{title: 'frontend'}];
  links: Array<{text: string, path: string}>;
  isLoggedIn = false;

  constructor(private api: ApiService, private router: Router, private navbarService: NavbarService) {
    this.getSites();
    this.router.config.unshift(
      {path: 'auth', component: AuthenticationComponent},
    );
  }
  getSites = () => {
    this.api.getSite().subscribe(
      data => {
        this.superfrog = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.links = this.navbarService.getLinks();
    this.navbarService.getLoginStatus().subscribe(status => this.isLoggedIn = status);
  }

  logout() {
    this.navbarService.updateLoginStatus(false);
    this.router.navigate(['']);
  }
}
