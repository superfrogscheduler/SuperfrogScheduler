import { Component, OnInit } from '@angular/core';
import { ListAdminService } from './list-accept-reject.service';
import { Appearance } from '../shared/appearance';
@Component({
  selector: 'app-list-accept-reject',
  templateUrl: './list-accept-reject.component.html',
  styleUrls: ['./list-accept-reject.component.css']
})
export class ListAcceptRejectComponent implements OnInit {
  getData: any = {};
  data: { "appearance": Appearance} = { "appearance": {}};
  constructor(private adminService: ListAdminService) { }

  ngOnInit() {
    this.getAppearances();
  }
  getAppearances() {
    this.adminService.getAppearances().subscribe(data => {
      this.getData = data;
    });
  }
}
