import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin-landing.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  getData: any = {};
  constructor(private landingService: AdminService,private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated(1)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 2)
        this.router.navigate(['/superfrog-landing'])
    }
    this.getAppearances();
  }
  getAppearances() {
    this.landingService.getAppearances().subscribe(data => {
      this.getData = data;
    });
  }
}
