import { Component, OnInit } from '@angular/core';
import { ListAdminService } from './list-accept-reject.service';
import { Appearance } from '../shared/appearance';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-list-accept-reject',
  templateUrl: './list-accept-reject.component.html',
  styleUrls: ['./list-accept-reject.component.css']
})
export class ListAcceptRejectComponent implements OnInit {
  getData: any = {};
  data: { "appearance": Appearance} = { "appearance": {}};
  constructor(private authService: AuthenticationService, private router: Router, private adminService: ListAdminService) { }

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
    this.adminService.getAppearances().subscribe(data => {
      this.getData = data;
    });
  }
}
