import { Component, OnInit } from '@angular/core';
import {Superfrog } from '../shared/superfrog';
import { Appearance } from '../shared/appearance';
import { AdminChangeService } from './admin-change-appearance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-change-appearance',
  templateUrl: './admin-change-appearance.component.html',
  styleUrls: ['./admin-change-appearance.component.css']
})
export class AdminChangeAppearanceComponent implements OnInit {
  id: number;
  appearanceData: any = {};
  data: {"appearance": Appearance, "superfrog": Superfrog} = { "appearance": {}, "superfrog": {}};
  constructor(private changeService: AdminChangeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getID();
  }
  getID() {
    this.changeService.get_Appearances_by_ID(this.id).subscribe(data => {
      this.appearanceData = data;
    });
  }
  updateAppearance() {
    this.changeService.updateAppearance(this.appearanceData).subscribe();
  }
}
