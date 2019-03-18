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
  data = [];
  toDisplay = {eventColor: '#4d1979', events: []};
  toAdd = [];
  toDelete = [];
  toUpdate = [];
  selectedEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent
  constructor() { }

  ngOnInit() {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      eventOverlap: false,
      selectable: false,
      selectOverlap: false,
      defaultView: 'agendaWeek',
      columnFormat: 'dddd',
      allDaySlot: false,
      defaultDate: moment('2018-12-30'),
      eventSources: [
        this.data,
        this.toAdd
      ],
      customButtons: {
        edit: {
          text: 'edit',
          click: () => {
            this.ucCalendar.fullCalendar('option', {
              header: {
                left: '',
                center: 'title',
                right: 'save,cancel delete'
              },
              editable: true,
              selectable: true
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
              },
              editable: false,
              selectable: false
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
        },
        delete: {
          text: 'delete',
          click: () => {
            this.ucCalendar.fullCalendar('removeEvents', (event)=>{Object.is(event, this.selectedEvent);});
            if(!this.selectedEvent.action){
              this.toDelete.push(this.selectedEvent.id);
            }
            else if(this.selectedEvent.action == 'add'){
              let index = this.toAdd.find((element)=>{return element == this.selectedEvent.id;});
              this.toAdd = this.toAdd.splice(index,1);
            }
            else {
              let index = this.toUpdate.find((element)=>{return element == this.selectedEvent.id;});
              this.toUpdate = this.toUpdate.splice(index,1);
            }
            this.ucCalendar.fullCalendar('rerenderEvents');
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

  select(event: any){
    var title = prompt("Enter event name:");
    if(title){
      this.toAdd.push({
        title: title,
        start: event.start,
        end: event.end,
        action: 'add'
      });
      this.ucCalendar.fullCalendar('removeEventSource', this.toAdd);
      this.ucCalendar.fullCalendar('refetchEvents');
      this.ucCalendar.fullCalendar('addEventSource', this.toAdd);
      this.ucCalendar.fullCalendar('refetchEvents');
    }
  }

  eventClick(event: any){
    if(this.selectedEvent){
      this.selectedEvent.borderColor = 'initial';
      this.ucCalendar.fullCalendar('updateEvent', this.selectedEvent);
    }

    this.selectedEvent = event.event;
    this.selectedEvent.borderColor = 'gold';
    this.ucCalendar.fullCalendar('updateEvent', event.event);
  }

}
