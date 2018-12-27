import { Component, OnInit } from '@angular/core';
import { List } from '../list-appearances';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Event } from '../shared/event';
import { ListAppearanceService } from './list-appearances.service';

@Component({
  selector: 'app-list-appearances',
  templateUrl: './list-appearances.component.html',
  styleUrls: ['./list-appearances.component.css']
})
export class ListAppearancesComponent implements OnInit {
  model: List = {};
  members = [1, 2, 3];
  view = false;
  data: {"customer": Customer, "appearance": Appearance} = {"customer": {}, "appearance": {}};
  constructor(private listService: ListAppearanceService) { }
  getData: any = [];
  onSubmitted() { this.view = true; }
  get diagnostic() { return JSON.stringify(this.model); }
  ngOnInit() {
  }

  getAppearances() {
    // this.listService.getAppearances(this.data).subscribe();
    this.listService.getAppearances(this.data).subscribe(getData => {
      this.getData = getData.json();
      console.log(this.getData);
    });
  }
}
