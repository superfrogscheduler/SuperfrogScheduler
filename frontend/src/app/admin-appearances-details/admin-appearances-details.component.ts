import { Component, OnInit } from '@angular/core';
import { AdminAppearancesDetailsService } from './admin-appearances-details.service';

@Component({
  selector: 'app-admin-appearances-details',
  templateUrl: './admin-appearances-details.component.html',
  styleUrls: ['./admin-appearances-details.component.css']
})
export class AdminAppearancesDetailsComponent implements OnInit {
  appearanceData: any = {};
  superfrogData: any = {};
  newVal: number;
  constructor(private adminDetails: AdminAppearancesDetailsService) { }

  ngOnInit() {
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
