import { Component, OnInit } from '@angular/core';
import { AdminDetailsService } from './accept-reject-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Superfrog } from '../shared/superfrog';

@Component({
  selector: 'app-accept-reject-details',
  templateUrl: './accept-reject-details.component.html',
  styleUrls: ['./accept-reject-details.component.css']
})
export class AcceptRejectDetailsComponent implements OnInit {
  id: number;
  getData: any = {};
  data: {"customer": Customer, "appearance": Appearance, "superfrog": Superfrog} = {"customer":{}, "appearance":{}, "superfrog": {}};
  constructor(private adminService: AdminDetailsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getID();
  }
  getID() {
    this.adminService.getID(this.id).subscribe(data => {
      console.log(data);
      this.getData = data;
    });
  }

  acceptAppear() {
    this.adminService.acceptAppear(this.id, this.data).subscribe(data => {
      this.getData = data;
    });
    this.router.navigate(['/list-accept-reject']);
  }
  rejectAppear() {
    this.adminService.rejectAppear(this.id, this.data).subscribe(data => {
      this.getData = data;
    });
    this.router.navigate(['/list-accept-reject']);
  }
}
