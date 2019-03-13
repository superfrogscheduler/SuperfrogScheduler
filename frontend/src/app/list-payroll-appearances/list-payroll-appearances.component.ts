import { Component, OnInit, ViewChild } from '@angular/core';
import { Appearance } from '../shared/appearance';
import { Superfrog } from '../shared/superfrog';
import { ListPayrollService } from './list-payroll-appearances.service';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { windowWhen } from 'rxjs/operators';
@Component({
  selector: 'app-list-payroll-appearances',
  templateUrl: './list-payroll-appearances.component.html',
  styleUrls: ['./list-payroll-appearances.component.css']
})
export class ListPayrollAppearancesComponent implements OnInit {
  appearances = [];
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private payrollService: ListPayrollService) { }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
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
    this.payrollService.getAppearances().subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          id: element.id,
          title: element.name,
          start: "" + element.date + " " + element.start_time,
          end: ""+ element.date + " " + element.end_time
        });   
      });
      this.ucCalendar.fullCalendar('removeEvents');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.appearances);
      // this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }
  eventClick(event: any) {
    window.open("http://localhost:4200/admin-generate-payroll/"+ event.event.id);
  }
}
