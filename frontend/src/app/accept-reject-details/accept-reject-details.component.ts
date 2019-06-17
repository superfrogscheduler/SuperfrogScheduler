import { Component, OnInit } from '@angular/core';
import { AdminDetailsService } from './accept-reject-details.service';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Superfrog } from '../shared/superfrog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import * as moment from 'moment';

@Component({
  selector: 'app-accept-reject-details',
  templateUrl: './accept-reject-details.component.html',
  styleUrls: ['./accept-reject-details.component.css']
})
export class AcceptRejectDetailsComponent implements OnInit {
  id: number;
  getData: any = {};
  rejectReason: String = "";
  data: {"customer": Customer, "appearance": Appearance, "superfrog": Superfrog} = {"customer":{}, "appearance":{}, "superfrog": {}};
  constructor(private adminService: AdminDetailsService, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(!this.authService.isAuthenticated(1)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 2)
        this.router.navigate(['/superfrog-landing'])
    }
    this.getID();
  }
  getID() {
    this.adminService.getID(this.id).subscribe(data => {
      console.log(data);
      this.getData = data;
      // this.getData.start_time = moment(this.getData.start_time).format('h:mma');
      // this.getData.end_time = moment(this.getData.end_time).format('h:mma');

    });
  }

  acceptAppear() {
    this.adminService.acceptAppear(this.id, this.data).subscribe(data => {
      this.getData = data;
    });
    this.router.navigate(['/confirm-accept']);
  }
  rejectAppear() {
    this.adminService.rejectAppear(this.id, this.rejectReason).subscribe(data => {
      this.getData = data;
    });
    this.router.navigate(['/confirm-reject']);
  }
}
