import { Component, OnInit, ViewChild } from '@angular/core';
import { Appearance } from '../shared/appearance';
import { Superfrog } from '../shared/superfrog';
import { ListPayrollService } from './list-payroll-appearances.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { windowWhen } from 'rxjs/operators';
import { List } from '../list-appearances';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Admin } from '../shared/admin';
@Component({
  selector: 'app-list-payroll-appearances',
  templateUrl: './list-payroll-appearances.component.html',
  styleUrls: ['./list-payroll-appearances.component.css']
})
export class ListPayrollAppearancesComponent implements OnInit {
  appearanceData: any = {};
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  superfrogData: any = {};
  newVal: number;
  admin: Admin;
  adminID: number;
  superfrogID: number;
  data: { "appearance": Appearance, "superfrog": Superfrog} = { "appearance": {}, "superfrog": {}};
  constructor(private payrollService: ListPayrollService, private router: Router, private authService: AuthenticationService) { }
  payrollData: any = {};
  ngOnInit() {
    // this.calendarOptions = {
    //   editable: false,
    //   eventLimit: false,
    //   header: {
    //     left: '',
    //     center: 'title',
    //     right: 'prev,next'
    //   },
    //   selectable: true,
    //   events: this.appearances,
    //   defaultView: 'listMonth'
    // };
    this.getAdmin();
    this.getAppearances();
    // this.superfrogID = 2;
  }
  getAdmin() {
    this.adminID = this.authService.getUser('logged').id;
    console.log(this.adminID);
  }
  getAppearances() {
    this.payrollService.getAppearances(this.data).subscribe(data => {
      this.appearanceData = data;
      this.superfrogData = data;
    });
  }
  // eventClick(event: any) {
  //   this.router.navigate(['/admin-generate-payroll/' + event.event.id]);
  // }
  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
    this.payrollService.get_by_Superfrog(this.newVal).subscribe(data => {
      this.appearanceData = data;
      this.superfrogID = data.superfrog.user.id;
      console.log(this.superfrogID);
    });
  }
  genPayroll() {
    this.payrollService.genPayroll(this.superfrogID, this.adminID, this.data).subscribe();
  }
}


