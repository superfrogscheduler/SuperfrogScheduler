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
    this.getAssignedAppearance();
    this.getPastAppearance();
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'listYear,listMonth,listWeek,listDay'
      },
      selectable: true,
      events: this.appearances,
      defaultView: 'listMonth'
    };
  }
  getPastAppearance() {
    this.listService.getPastAppearances().subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          title: element.name,
          start: "" + element.date + " " + element.start_time,
          end: ""+ element.date + " " + element.end_time
        });   
      });
      console.log(this.appearances);
    });
  }
  getAssignedAppearance() {
    this.listService.getAssignedAppearances().subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          title: element.name,
          start: "" + element.date + " " + element.start_time,
          end: "" + element.date + " " + element.end
        });
      });
    });
  }
}
