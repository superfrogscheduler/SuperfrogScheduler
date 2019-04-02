import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-appearances-details',
  templateUrl: './admin-appearances-details.component.html',
  styleUrls: ['./admin-appearances-details.component.css']
})
export class AdminAppearancesDetailsComponent implements OnInit {
  appearanceData: any = {};
  constructor() { }

  ngOnInit() {
  }

}
