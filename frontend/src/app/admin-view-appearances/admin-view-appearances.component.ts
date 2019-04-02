import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { Router } from '@angular/router';
import { ViewAppearancesAdminService } from './admin-view-appearances.service';
import { Appearance } from '../shared/appearance';
import { Superfrog } from '../shared/superfrog';
@Component({
  selector: 'app-admin-view-appearances',
  templateUrl: './admin-view-appearances.component.html',
  styleUrls: ['./admin-view-appearances.component.css']
})
export class AdminViewAppearancesComponent implements OnInit {
  appearances = [];
  calendarOptions: Options;
  data: { "appearance": Appearance, "superfrog": Superfrog} = { "appearance": {}, "superfrog": {}};
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private adminView: ViewAppearancesAdminService, private router: Router) { }

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
    this.getAssignedAppearance();
  }
  getPendingAppearance() {
    this.adminView.getPendingAppearances().subscribe(data => {
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
  getAssignedAppearance() {
    this.adminView.getAssignedAppearances().subscribe(data => {
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
    this.router.navigate(['/admin-change-appearances/' + event.event.id ]);
  }
}
