import { Component, OnInit } from '@angular/core';
import { AdminService } from './admin-landing.service';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  getData: any = {};
  constructor(private landingService: AdminService) { }

  ngOnInit() {
    this.getAppearances();
  }
  getAppearances() {
    this.landingService.getAppearances().subscribe(data => {
      this.getData = data;
    });
  }
}
