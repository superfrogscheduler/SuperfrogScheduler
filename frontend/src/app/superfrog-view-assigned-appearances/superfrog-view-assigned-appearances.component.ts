import { Component, OnInit } from '@angular/core';
import { ViewAllAppearancesService } from './superfrog-view-assigned-appearances.service'; 

@Component({
  selector: 'app-superfrog-view-assigned-appearances',
  templateUrl: './superfrog-view-assigned-appearances.component.html',
  styleUrls: ['./superfrog-view-assigned-appearances.component.css']
})
export class SuperfrogViewAssignedAppearancesComponent implements OnInit {
  appearanceData: any = {};
  superfrogData: any = {};
  newVal: number;
  constructor(private assignedAppearances: ViewAllAppearancesService) { }

  ngOnInit() {
    this.getAppearances();
    this.getSuperfrogs();
  }
  getAppearances() {
    this.assignedAppearances.getAppearances().subscribe(data => {
      this.appearanceData = data;
    });
  }
  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
    this.assignedAppearances.get_by_Superfrog(this.newVal).subscribe(data => {
      this.appearanceData = data;
    });
  }
  getSuperfrogs() {
    this.assignedAppearances.get_Superfrogs().subscribe(data => {
      this.superfrogData = data;
    });
  }
}
