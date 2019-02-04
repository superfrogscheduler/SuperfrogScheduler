import { Component, OnInit, forwardRef, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RequestForm } from '../request';
import { RequestFormService } from './request-form.service';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Event } from '../shared/event';
import * as moment from 'moment';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
  providers: [RequestFormService, {
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
  showCalendar = true;
  data: { "customer": Customer, "appearance": Appearance } = { "customer": {}, "appearance": {} };
  clickedDay: any;
  errorMsg: string = "";
  earliestDay: any = moment().add(2, 'weeks').subtract(1, 'day').startOf('day');
  events = { id: "events", events: [], editable: false, overlap: false, color: 'purple' };
  newEvent = [];
  constructor(private requestService: RequestFormService) { }

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {

    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      selectable: false,
      selectOverlap: false,
      longPressDelay: 500,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      eventSources: [
        [{
          id: '2week',
          allDay: true,
          start: moment(0),
          end: this.earliestDay.add(1, 'day'),
          rendering: 'background',
          backgroundColor: 'lightgray'
        }],
      ],
      eventOverlap: false,
      customButtons: {
        back: {
          text: 'back',
          click: () => {
            this.ucCalendar.fullCalendar('changeView', 'month', this.clickedDay);
            this.ucCalendar.fullCalendar('option', {
              header: {
                left: 'prev,next today',
                center: 'title',
                right: ''
              },
              selectable: false
            });
            this.ucCalendar.fullCalendar('goToDate', this.clickedDay)
          }
        }
      }
    };
    this.requestService.getEvents(2019, 3).subscribe(data => {
      data.forEach(element => {
        this.events.events.push({ title: "Unavailable", start: element.start, end: element.end })
      });
      this.ucCalendar.fullCalendar('addEventSource', this.events);
      console.log(this.events);
      console.log(this.ucCalendar.fullCalendar('getEventSources'));
      this.ucCalendar.fullCalendar('refetchEvents');
      this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }

  saveRequest() {
    this.requestService.saveRequest(this.data).subscribe();
  }
  dayClick(event: any) {
    this.errorMsg = "";
    console.log(event);
    if (event.view.type == "month") {
      this.clickedDay = event.date;
      if (event.date.isBefore(this.earliestDay, 'day')) {
        this.errorMsg = "Appearances must be scheduled at least two weeks in advance."
      }
      else {
        this.ucCalendar.fullCalendar('changeView', 'agendaDay', this.clickedDay);
        this.ucCalendar.fullCalendar('option', {
          header: {
            left: 'back',
            center: 'title',
            right: ''
          },
          selectable: true
        });
      }
    }
  }
  select(event: any) {
    this.errorMsg = "";
    if (this.newEvent.length == 0) {
      this.newEvent.push({
        id: "myevent",
        title: "My Event",
        start: event.start,
        end: event.end
      });
      this.ucCalendar.fullCalendar('addEventSource', this.newEvent);
    }
    else {
      this.newEvent[0] = {
        id: "myevent",
        title: "My Event",
        start: event.start,
        end: event.end
      };
      console.log(this.newEvent[0].end.format());
      this.ucCalendar.fullCalendar('removeEventSource', this.newEvent);
      this.ucCalendar.fullCalendar('addEventSource', this.newEvent);
    }
    this.ucCalendar.fullCalendar('refetchEvents');
    this.ucCalendar.fullCalendar('rerenderEvents');
  }
  updateEvent(event: any){
    this.errorMsg = "";
    console.log(event.event.end.format());
    this.newEvent[0] = event.event;
    console.log(this.newEvent[0].start.format() + " " +this.newEvent[0].end.format());
    this.ucCalendar.fullCalendar("rerenderEvents");
  }
  continueClick(){
    this.data.appearance.date = this.newEvent[0].start.format('YYYY-MM-DD');
    this.data.appearance.start_time = this.newEvent[0].start.format('hh:mm');
    this.data.appearance.end_time = this.newEvent[0].end.format('hh:mm');
    this.showCalendar = false;
  }
  backToCalendar(){
    this.ucCalendar.fullCalendar('refetchEvents');
    this.ucCalendar.fullCalendar("changeView", "month");
    this.showCalendar = true;
  }
}
