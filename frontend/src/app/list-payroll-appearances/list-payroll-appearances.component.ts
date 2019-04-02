import { Component, OnInit, ViewChild } from '@angular/core';
import { Appearance } from '../shared/appearance';
import { Superfrog } from '../shared/superfrog';
import { ListPayrollService } from './list-payroll-appearances.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { windowWhen } from 'rxjs/operators';
import { List } from '../list-appearances';
@Component({
  selector: 'app-list-payroll-appearances',
  templateUrl: './list-payroll-appearances.component.html',
  styleUrls: ['./list-payroll-appearances.component.css']
})
export class ListPayrollAppearancesComponent implements OnInit {
  model: List = {};
  data: { "appearance": Appearance, "superfrog": Superfrog} = { "appearance": {}, "superfrog": {}};
  constructor(private payrollService: ListPayrollService) { }
  payrollData: any = {};
  ngOnInit() {
    this.getAppearances();
  }
  getAppearances() {
    this.payrollService.getAppearances(this.data).subscribe(data => {
      this.payrollData  = data;
      console.log(this.payrollData);
    });
  }

}


