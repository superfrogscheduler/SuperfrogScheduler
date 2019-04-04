import { Component, OnInit, ViewChild } from '@angular/core';
import { Appearance } from '../shared/appearance';
import { Superfrog } from '../shared/superfrog';
import { ListPayrollService } from './list-payroll-appearances.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { windowWhen } from 'rxjs/operators';
import { List } from '../list-appearances';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-payroll-appearances',
  templateUrl: './list-payroll-appearances.component.html',
  styleUrls: ['./list-payroll-appearances.component.css']
})
export class ListPayrollAppearancesComponent implements OnInit {
  appearances = [];
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  data: { "appearance": Appearance, "superfrog": Superfrog} = { "appearance": {}, "superfrog": {}};
  constructor(private payrollService: ListPayrollService, private router: Router) { }
  payrollData: any = {};
  ngOnInit() {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      header: {
        left: '',
        center: 'title',
        right: 'prev,next'
      },
      selectable: true,
      events: this.appearances,
      defaultView: 'listMonth'
    };
    this.getAppearances();
  }
  getAppearances() {
    this.payrollService.getAppearances(this.data).subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          id: element.id,
          title: element.appearance.name,
          start: "" + element.appearance.date + " " + element.appearance.start_time,
          end: ""+ element.appearance.date + " " + element.appearance.end_time
        });   
      });
      this.ucCalendar.fullCalendar('removeEvents');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.appearances);
      // this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }
  eventClick(event: any) {
    this.router.navigate(['/admin-generate-payroll/' + event.event.id]);
  }
}


