import { Component, OnInit } from '@angular/core';
import { AdminAppearancesDetailsService } from './admin-appearances-details.service';
import { AuthenticationService } from '../authentication/authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-admin-appearances-details',
  templateUrl: './admin-appearances-details.component.html',
  styleUrls: ['./admin-appearances-details.component.css']
})
export class AdminAppearancesDetailsComponent implements OnInit {
  appearanceData: any = {};
  superfrogData: any = {};
  newVal: number;
  constructor(private router: Router,private authService: AuthenticationService, private adminDetails: AdminAppearancesDetailsService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated(1)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 2)
        this.router.navigate(['/superfrog-landing'])
    }
    this.getAppearances();
    this.getSuperfrogs();
  }
  getAppearances() {
    this.adminDetails.getAppearances().subscribe( data => {
      this.appearanceData = data;
    });
  }
  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
    this.adminDetails.get_by_Superfrog(this.newVal).subscribe(data => {
      this.appearanceData= data;
    });
  }
  getSuperfrogs() {
    this.adminDetails.get_Superfrogs().subscribe(data => {
      this.superfrogData = data;
    });
  }
}
