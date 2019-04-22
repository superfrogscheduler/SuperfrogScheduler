import { Component, OnInit, ViewChild, Input, ViewChildren } from '@angular/core';
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
import { stringify } from '@angular/core/src/render3/util';
import { analyzeAndValidateNgModules, isNgTemplate } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { saveAs } from 'file-saver';

@NgModule({
  imports: [
     FormsModule
  ],
  })
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
  payroll_Name: any ;
  payroll_start: any;
  payroll_end: any;
  SFID: number;
  payroll_checkbox: any ;
  array = [];
  tempData: any = {};
  payroll_array: any = [];
  @ViewChildren('myItem') names;
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
    this.getSuperfrogs();
    // this.superfrogID = 2;
  }
  getAdmin() {
    this.adminID = this.authService.getUser('logged').user.id;
    console.log(this.adminID);
  }
  getAppearances() {
    this.payrollService.getAppearances(this.data).subscribe(data => {
      this.appearanceData = data;
    });
  }
  // eventClick(event: any) {
  //   this.router.navigate(['/admin-generate-payroll/' + event.event.id]);
  // }
  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    this.payrollService.get_by_Superfrog(this.newVal).subscribe(data => {
      this.appearanceData = data;
    });
  }

  OnCheckboxSelect(id, event) {
      if (event.target.checked === true) {
        this.array.push({id: id});
        this.payroll_array = JSON.stringify(this.array);
      }
      if (event.target.checked === false) {
        this.array = this.array.filter((names) => names.id !== id);
      }
  }
  genPayroll() {
    const reader = new FileReader();
    this.payrollService.genPayroll(this.adminID, this.payroll_array).subscribe(Response => {
      const blob = new Blob([Response], { type: 'application/pdf' });
      saveAs(blob, 'payroll.pdf');
    });
  }
  getSuperfrogs() {
    this.payrollService.get_Superfrogs().subscribe(data => {
      this.superfrogData = data;
    });
  }
  // @Input()
  filter_SuperfrogAppearance() {
    this.SFID = this.payroll_Name;
    this.payrollService.filter_SuperfrogAppearance( this.payroll_start , this.payroll_end).subscribe(data => {
      this.appearanceData = data;
    });
  }
}


