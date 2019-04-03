import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { Appearance } from '../shared/appearance';
import { Customer } from '../shared/customer';
import { ListAppearancesService } from './view-appearances.service';
import { from } from 'rxjs';
import * as moment from 'moment/moment.js';
import { element } from '@angular/core/src/render3';
import { Superfrog } from '../shared/superfrog';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-appearances',
  templateUrl: './view-appearances.component.html',
  styleUrls: ['./view-appearances.component.css']
})
export class ViewAppearancesComponent implements OnInit {
  appearances = [];
  calendarOptions: Options;
  superfrog: Superfrog;
  superfrogID: number;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private listService: ListAppearancesService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.superfrog = {};
    this.getUser();
    this.getSuperFrogId();
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
    this.getAssignedAppearance();
  }
  getUser() {
    this.superfrog = this.authService.getUser('logged');
  }
  getSuperFrogId() {
    this.superfrogID = this.authService.getUser('logged').id;
    console.log(this.superfrogID);
  }
  getPastAppearance() {
    this.listService.getPastAppearances(this.superfrogID).subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          id: element.appearance.id,
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
    this.listService.getAssignedAppearances(this.superfrogID).subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          id: element.appearance.id,
          title: element.appearance.name,
          start: "" + element.appearance.date + " " + element.appearance.start_time,
          end: "" + element.appearance.date + " " + element.appearance.end_time
        });
      });
      this.ucCalendar.fullCalendar('removeEvents');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.appearances);
      // this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }
  getAppearances() {
    this.router.navigate(['/superfrog-view-assigned-appearances/']);
  }
  next() {
    this.ucCalendar.fullCalendar('next');
  }
  prev() {
    this.ucCalendar.fullCalendar('prev');
  }
  eventClick(event: any) {
      window.open("http://localhost:4200/appearance-details/"+ event.event.id);
  }
}
