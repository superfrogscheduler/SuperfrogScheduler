import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { Appearance } from '../shared/appearance';
import { Customer } from '../shared/customer';
import { ListAppearancesService } from './view-appearances.service';
import { from } from 'rxjs';
import * as moment from 'moment/moment.js';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'app-view-appearances',
  templateUrl: './view-appearances.component.html',
  styleUrls: ['./view-appearances.component.css']
})
export class ViewAppearancesComponent implements OnInit {
  appearances = [];
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private listService: ListAppearancesService) { }

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
    this.getAssignedAppearance();
  }
  getPastAppearance() {
    this.listService.getPastAppearances().subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          id: element.id,
          title: element.name,
          start: "" + element.date + " " + element.start_time,
          end: ""+ element.date + " " + element.end_time
        });   
      });
      console.log(this.appearances);
      this.ucCalendar.fullCalendar('removeEvents');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.appearances);
      // this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }
  getAssignedAppearance() {
    this.listService.getAssignedAppearances().subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          id: element.id,
          title: element.name,
          start: "" + element.date + " " + element.start_time,
          end: "" + element.date + " " + element.end
        });
      });
      this.ucCalendar.fullCalendar('removeEvents');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.appearances);
      // this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }
  next() {
    this.ucCalendar.fullCalendar('next');
  }
  prev() {
    this.ucCalendar.fullCalendar('prev');
  }
  eventClick(event: any) {
      alert(event.event.id);
      window.open("http://localhost:4200/appearance-details/"+ event.event.id);
  }
}
