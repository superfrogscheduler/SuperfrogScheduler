import { Component, OnInit } from '@angular/core';
import { ViewAllAppearancesService } from './superfrog-view-assigned-appearances.service'; 

@Component({
  selector: 'app-superfrog-view-assigned-appearances',
  templateUrl: './superfrog-view-assigned-appearances.component.html',
  styleUrls: ['./superfrog-view-assigned-appearances.component.css']
})
export class SuperfrogViewAssignedAppearancesComponent implements OnInit {
  appearanceData: any = {};
  constructor(private assignedAppearances: ViewAllAppearancesService) { }

  ngOnInit() {
    this.getAppearances();
  }
  getAppearances() {
    this.assignedAppearances.getAppearances().subscribe(data => {
      this.appearanceData = data;
    });
  }
}
