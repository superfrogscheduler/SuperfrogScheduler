import { Component, OnInit } from '@angular/core';
import { AdminAppearancesDetailsService } from './admin-appearances-details.service';

@Component({
  selector: 'app-admin-appearances-details',
  templateUrl: './admin-appearances-details.component.html',
  styleUrls: ['./admin-appearances-details.component.css']
})
export class AdminAppearancesDetailsComponent implements OnInit {
  appearanceData: any = {};
  constructor(private adminDetails: AdminAppearancesDetailsService) { }

  ngOnInit() {
    this.getAppearances();
  }
  getAppearances() {
    this.adminDetails.getAppearances().subscribe( data => {
      this.appearanceData = data;
    });
  }
}
