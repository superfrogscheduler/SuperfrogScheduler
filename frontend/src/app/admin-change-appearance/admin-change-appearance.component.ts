import { Component, OnInit } from '@angular/core';
import {Superfrog } from '../shared/superfrog';
import { Appearance } from '../shared/appearance';
import { AdminChangeService } from './admin-change-appearance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-change-appearance',
  templateUrl: './admin-change-appearance.component.html',
  styleUrls: ['./admin-change-appearance.component.css']
})
export class AdminChangeAppearanceComponent implements OnInit {
  id: number;
  appearanceData: any = {};
  newEvent = [];
  data: {"appearance": Appearance, "superfrog": Superfrog} = { "appearance": {}, "superfrog": {}};
  // form = new FormGroup({
  //   Name: new FormControl(''),
  //   Date: new FormControl(''),
  //   organization: new FormControl(''),
  //   location: new FormControl(''),
  //   Parking_info: new FormControl(''),
  //   Org_type: new FormControl(''),
  //   Cheerleaders: new FormControl(''),
  //   Showgirls: new FormControl(''),
  //   Instructions: new FormControl(''),
  //   Expenses: new FormControl(''),
  //   Outside_Orgs: new FormControl(''),
  //   Description: new FormControl(''),
  // });
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
    // this.data.appearance.name = this.form.get('Name').value;
    // this.data.appearance.date = this.form.get('Date').value;
    // this.data.appearance.start_time = this.newEvent[0].start.format('kk:mm');
    // this.data.appearance.end_time = this.newEvent[0].end.format('kk:mm');
    // this.data.appearance.cheerleaders = this.form.get('Cheerleaders').value;
    // this.data.appearance.showgirls = this.form.get('Showgirls').value;
    // this.data.appearance.special_instructions = this.form.get('Instructions').value;
    // this.data.appearance.expenses = this.form.get('Expenses').value;
    // this.data.appearance.outside_orgs = this.form.get('Out').value;
    // this.data.appearance.description = this.form.get('Description').value;;
    // this.changeService.updateAppearance(this.data).subscribe();
  }
}
