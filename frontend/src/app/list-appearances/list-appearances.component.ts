import { Component, OnInit } from '@angular/core';
import { List } from '../list-appearances';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Event } from '../shared/event';
import { ListAppearanceService } from './list-appearances.service';
import { _getViewData } from '@angular/core/src/render3/instructions';

@Component({
  selector: 'app-list-appearances',
  templateUrl: './list-appearances.component.html',
  styleUrls: ['./list-appearances.component.css']
})
export class ListAppearancesComponent implements OnInit {
  model: List = {};
  members = [1, 2, 3];
  view = false;
  data: { "appearance": Appearance} = { "appearance": {}};
  constructor(private listService: ListAppearanceService) { }
  getData: {};
  onSubmitted() { this.view = true; }
  get diagnostic() { return JSON.stringify(this.model); }
  ngOnInit() {
    this.getAppearances();
  }

  getAppearances() {
    // this.listService.getAppearances(this.data).subscribe();
    this.listService.getAppearances(this.data).subscribe(data => {
      this.getData = data;
    });
  }
}
