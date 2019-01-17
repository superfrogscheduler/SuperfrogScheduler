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
  clickedDay: any = 'test';
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
          start: moment(),
          end: moment().add(2, 'weeks'),
          rendering: 'background',
          backgroundColor: 'lightgray'
        }
      ]
    };
  }

  saveRequest() {
    this.requestService.saveRequest(this.data).subscribe();
  }
  dayClick(event: any) {
    console.log(event);
    // this.clickedDay = event.date.format();
    // this.ucCalendar.fullCalendar('changeView', 'agendaDay', this.clickedDay);
  }

}
