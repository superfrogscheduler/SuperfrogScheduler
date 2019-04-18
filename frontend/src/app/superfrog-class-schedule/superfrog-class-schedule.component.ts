import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import * as moment from 'moment';
import * as _ from 'lodash';
import { SuperfrogClassScheduleService } from './superfrog-class-schedule.service';
import { element } from '@angular/core/src/render3';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router} from '@angular/router';
@Component({
  selector: 'superfrog-class-schedule',
  templateUrl: './superfrog-class-schedule.component.html',
  styleUrls: ['./superfrog-class-schedule.component.css']
})
export class SuperfrogClassScheduleComponent implements OnInit {
  calendarOptions: Options;
  defaultDateStr = '2018-12-30';
  defaultDate = moment(this.defaultDateStr+ 'T00:00:00');
  data = [];
  toDisplay = {eventColor: '#4d1979', events: []};
  toAdd = [];
  toDelete = [];
  toUpdate = [];
  addIdCount = 0;
  superfrog: any;

  selectedEvent: any;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent
  constructor(private classScheduleService: SuperfrogClassScheduleService, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    console.log(this.authService.getUser('logged'));
    if(!this.authService.isAuthenticated(2)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 1)
        this.router.navigate(['/admin-landing'])
    }
    this.superfrog = this.authService.getUser('logged').user.id;
    this.getClasses(this.superfrog).subscribe(data =>{
      data.forEach(element => {
        let start = moment(this.defaultDateStr+'T'+element.start);
        start.add(element.day, 'd');
        let end = moment(this.defaultDateStr+'T'+element.end);
        end.add(element.day, 'd');
        this.data.push({
          id: element.id,
          title: element.name,
          start: start,
          end: end
        });
      });
      this.toDisplay.events = _.cloneDeep(this.data);
      this.calendarInit();
    });

  }

  getClasses(id: number){
    return this.classScheduleService.getSchedule(id);
  }

  calendarInit(){
    this.calendarOptions = {
      minTime: "08:00:00",
      maxTime:"22:00:00",
      editable: false,
      eventLimit: false,
      eventOverlap: false,
      selectable: false,
      selectOverlap: false,
      defaultView: 'agendaWeek',
      columnFormat: 'dddd',
      allDaySlot: false,
      defaultDate: this.defaultDate,
      eventSources: [
        this.toDisplay.events,
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
              let changes = {
                toAdd: [],
                toUpdate: [],
                toDelete: []
              };
              this.toAdd.forEach(element => {
                changes.toAdd.push({
                  superfrog: this.superfrog,
                  name: element.title,
                  day: element.start.day(),
                  start: element.start.format("kk:mm"),
                  end: element.end.format("kk:mm")
                });
              });
              this.toUpdate.forEach(element =>{
                changes.toUpdate.push({
                  id: element.id,
                  superfrog: this.superfrog,
                  name: element.title,
                  day: element.start.day(),
                  start: element.start.format("kk:mm"),
                  end: element.end.format("kk:mm")
                });
              });
              changes.toDelete = this.toDelete;
              this.classScheduleService.saveChanges(this.superfrog, changes).subscribe(data =>{
                this.data = [];
                this.toUpdate = [];
                this.toAdd = [];
                this.toDelete = [];
                data.forEach(element => {
                  let start = moment(this.defaultDateStr+'T'+element.start);
                  start.add(element.day, 'd');
                  let end = moment(this.defaultDateStr+'T'+element.end);
                  end.add(element.day, 'd');
                  this.data.push({
                    id: element.id,
                    title: element.name,
                    start: start,
                    end: end
                  });
                });
                this.toDisplay.events = _.cloneDeep(this.data);  
                this.ucCalendar.fullCalendar('option', {
                  header:{
                    left: '',
                    center: 'title',
                    right: 'edit'
                  },
                  editable: false,
                  selectable: false
                });
                this.ucCalendar.fullCalendar('removeEvents');
                this.ucCalendar.fullCalendar('rerenderEvents');
                this.ucCalendar.fullCalendar('removeEventSource', this.toDisplay);
                this.ucCalendar.fullCalendar('refetchEvents');
                this.ucCalendar.fullCalendar('addEventSource', this.toDisplay);
                this.ucCalendar.fullCalendar('refetchEvents');
              });
          }
        },
        cancel: {
          text: 'cancel',
          click: () => {
            this.toDisplay.events = _.cloneDeep(this.data);
            this.toUpdate = [];
            this.toAdd = [];
            this.toDelete = [];
            this.ucCalendar.fullCalendar('option', {
              header:{
                left: '',
                center: 'title',
                right: 'edit'
              },
              editable: false,
              selectable: false
            });
            this.ucCalendar.fullCalendar('removeEvents');
            this.ucCalendar.fullCalendar('rerenderEvents');
            this.ucCalendar.fullCalendar('removeEventSource', this.toDisplay);
            this.ucCalendar.fullCalendar('refetchEvents');
            this.ucCalendar.fullCalendar('addEventSource', this.toDisplay);
            this.ucCalendar.fullCalendar('refetchEvents');

          }
        },
        delete: {
          text: 'delete',
          click: () => {
            this.ucCalendar.fullCalendar('removeEvents', (event)=>{return event.start.isSame(this.selectedEvent.start) && event.end.isSame(this.selectedEvent.end); });
            if(this.selectedEvent.id){
              this.toDelete.push(this.selectedEvent.id);
              let index= this.toDisplay.events.findIndex((element)=>{return element.id = this.selectedEvent.id});
              if(index > -1){
                this.toDisplay.events.splice(index,1);
              }
              else{
                index = this.toUpdate.findIndex((element)=>{return element.id == this.selectedEvent.id;});
                this.toUpdate.splice(index,1);
              }
            }
            else{
              let index = this.toAdd.findIndex((element)=>{return element.addId == this.selectedEvent.addId;});
              this.toAdd.splice(index,1);
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
        addId: 'a'+this.addIdCount,
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
    if(this.ucCalendar.fullCalendar('option', 'selectable')){
      if(this.selectedEvent){
        this.selectedEvent.borderColor = 'initial';
        this.ucCalendar.fullCalendar('updateEvent', this.selectedEvent);
      }

      this.selectedEvent = event.event;
      this.selectedEvent.borderColor = 'gold';
      this.ucCalendar.fullCalendar('updateEvent', event.event);
    }
  }

  updateEvent(event: any){
    if(event.event.id){
      let index = this.toDisplay.events.findIndex((element)=>{return element.id == event.event.id;});
      if(index > -1){
        let updated = this.toDisplay.events.splice(index, 1);
        updated = event.event;
        this.toUpdate.push(updated);
      }
      else{
        index = this.toUpdate.findIndex((element)=>{return element.id == event.event.id;});
        this.toUpdate[index] = event.event;
      }
    }
    else{
      let index = this.toAdd.findIndex((element)=>{return element.addId == event.event.addId;});
      this.toAdd[index] = event.event;
    }
    this.ucCalendar.fullCalendar('updateEvent', event.event);
  }

  getSchedule(id: number){

  }

  

}
