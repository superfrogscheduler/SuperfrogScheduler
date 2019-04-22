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
import { ThrowStmt } from '@angular/compiler';
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
  ifExisting: boolean;
  chooseDate: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private listService: ListAppearancesService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated(2)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 1)
        this.router.navigate(['/admin-landing'])
    }
    this.superfrog = {};
    this.getUser();
    this.getSuperFrogId();
    this.ifExisting = false;
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      rendering: true,
      eventOverlap: false,
      header: {
        left: 'prevYear, nextYear',
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
    this.superfrogID = this.authService.getUser('logged').user.id;
    console.log(this.superfrogID);
  }
  getPastAppearance() {
    this.appearances.length = 0;
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
      this.ucCalendar.fullCalendar('rerenderEvents');
      // this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }
  getAssignedAppearance() {
    this.appearances.length = 0;
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
      // this.ucCalendar.fullCalendar('rerenderResources');
      this.ucCalendar.fullCalendar('rerenderEvents');
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
      // window.open("http://localhost:4200/appearance-details/"+ event.event.id);
      this.router.navigate(['/appearance-details/' + event.event.id]);
  }
  onChangeDate() {
    console.log(this.chooseDate);
    this.ucCalendar.fullCalendar('gotoDate', this.chooseDate);
  }
}
