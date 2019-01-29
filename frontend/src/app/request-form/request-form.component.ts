import { Component, OnInit, forwardRef, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {RequestForm} from '../request';
import { RequestFormService } from './request-form.service';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import {Event} from '../shared/event';
import * as moment from 'moment';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
  providers: [RequestFormService,     {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RequestFormComponent),
    multi: true
  }]
})
export class RequestFormComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  model: RequestForm = {};
  members = [1, 2, 3];
  submitted = false;
  data: {"customer": Customer, "appearance": Appearance} = {"customer":{}, "appearance":{}};
  clickedDay: any;
  errorMsg: string = "";
  earliestDay: any = moment().add(2, 'weeks').subtract(1, 'day').startOf('day');
  constructor(private requestService: RequestFormService) {}

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      events: [
        {
          id: '2week',
          allDay: true,
          start: moment(0),
          end: this.earliestDay.add(1, 'day'),
          rendering: 'background',
          backgroundColor: 'lightgray'
        }
      ],
      eventOverlap: false,
      customButtons: {
        back: {
          text: 'back',
          click : () => {
            this.ucCalendar.fullCalendar('changeView', 'month', this.clickedDay);
            this.ucCalendar.fullCalendar('option', {
              header: {
                left: 'prev,next today',
                center: 'title',
                right: ''
              }
            });
            this.ucCalendar.fullCalendar('goToDate', this.clickedDay)
          }
        }
      }
    };
  }

  saveRequest() {
    this.requestService.saveRequest(this.data).subscribe();
  }
  dayClick(event: any) {
    console.log(event);
    this.clickedDay = event.date;
    if(event.date.isBefore(this.earliestDay, 'day')){
      this.errorMsg = "Appearances must be scheduled at least two weeks in advance."
    }
    else{
      this.errorMsg = "";
      this.ucCalendar.fullCalendar('changeView', 'agendaDay', this.clickedDay);
      this.ucCalendar.fullCalendar('option', {
        header: {
          left: 'back',
          center: 'title',
          right: ''
        }
      });
    }

  }
}
