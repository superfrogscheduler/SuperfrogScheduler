import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import * as moment from 'moment';
@Component({
  selector: 'superfrog-class-schedule',
  templateUrl: './superfrog-class-schedule.component.html',
  styleUrls: ['./superfrog-class-schedule.component.css']
})
export class SuperfrogClassScheduleComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent
  constructor() { }

  ngOnInit() {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      eventOverlap: false,
      defaultView: 'agendaWeek',
      columnFormat: 'dddd',
      allDaySlot: false,
      defaultDate: moment('2018-12-30'),
      customButtons: {
        edit: {
          text: 'edit',
          click: () => {
            this.ucCalendar.fullCalendar('option', {
              header: {
                left: '',
                center: 'title',
                right: 'save cancel'
              },
              editable: true
            });
          }
        },
        save: {
          text: 'save',
          click: () => {
            this.ucCalendar.fullCalendar('option', {
              header:{
                left: '',
                center: 'title',
                right: 'edit'
              }
            });
          }
        },
        cancel: {
          text: 'cancel',
          click: () => {
            this.ucCalendar.fullCalendar('option', {
              header:{
                left: '',
                center: 'title',
                right: 'edit'
              }
            });
          }
        }
      }, 
      header: {
        left: '',
        center: 'title',
        right: 'edit'
      },
      titleFormat: '[Class Schedule]',

    }
  }

}
