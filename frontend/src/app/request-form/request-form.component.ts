import { Component, OnInit, forwardRef, ViewChild, NgZone } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { RequestForm } from '../request';
import { RequestFormService } from './request-form.service';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Event } from '../shared/event';
import * as moment from 'moment';
import { GoogleService } from '../shared/google.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
  providers: [RequestFormService, GoogleService, {
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
  data: { "customer": Customer, "appearance": Appearance } = { "customer": {}, "appearance": {performance_required: false, cheerleaders: "None", showgirls: "None", org_type: "TCU"} };
  clickedDay: any;
  errorMsg: string = "";
  earliestDay: any = moment().add(2, 'weeks').subtract(1, 'day').startOf('day');
  onCampus: boolean = true
  locationAddr: string;
  locationAptNum: string;
  locationName: string;
  invalidAddr: boolean = false;
  events = { id: "events", events: [], editable: false, overlap: false, eventColor: '#4d1979' };
  newEvent = [];
  
  constructor(private requestService: RequestFormService, private googleService: GoogleService, private zone: NgZone, private router: Router) { }

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    eventTitle: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[2-9]\d{2}-\d{3}-\d{4}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', Validators.required),
    locationAddr: new FormControl(''),
    location: new FormControl('', Validators.required)
  })
  ngOnInit() {

    //Initialize the calendar's options
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      selectable: false,
      selectOverlap: false,
      longPressDelay: 500,
      eventColor: '#4d1979',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      //block out two weeks before
      eventSources: [
        [{
          id: '2week',
          allDay: true,
          start: moment(0),
          end: this.earliestDay.add(1, 'day'),
          rendering: 'background',
          backgroundColor: 'lightgray'
        }],
        this.events,
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
    //get preexisting events from the database
    this.requestService.getEvents(moment().year(), moment().add(1, 'M').month()).subscribe(data => {
      data.forEach(element => {
        this.events.events.push({ title: "Unavailable", start: element.start, end: element.end })
      });
      this.ucCalendar.fullCalendar('addEventSource',this.events);
     //Add them to the calendar
    });

  }

  getEvents(year, month){
    this.ucCalendar.fullCalendar('removeEventSource', this.events);
    this.events.events = [];
    this.requestService.getEvents(year, month).subscribe(data => {
      data.forEach(element => {
        this.events.events.push({ title: "Unavailable", start: element.start, end: element.end })
      });
      this.ucCalendar.fullCalendar('addEventSource',this.events);
      console.log(this.ucCalendar.fullCalendar('getEventSources'));
      //Add them to the calendar
      this.ucCalendar.fullCalendar('rerenderEvents');
      });
      
  }

  saveRequest() {
    this.data.appearance.location = "";
    if(!this.onCampus){
      if(this.locationName){
        this.data.appearance.location+=this.locationName +", ";
      }
      this.data.appearance.location+=this.form.get('locationAddr').value;
      if(this.locationAptNum){
        this.data.appearance.location+=" #"+this.locationAptNum;
      }
    }
    else{
      this.data.appearance.location = this.form.get('location').value;
    }
    this.data.customer.first_name = this.form.get('firstName').value;
    this.data.customer.last_name = this.form.get('lastName').value;
    this.data.customer.phone = this.form.get('phoneNumber').value;
    this.data.customer.email = this.form.get('email').value;
    this.data.appearance.name = this.form.get('eventTitle').value;
    this.data.appearance.description = this.form.get('description').value;
    this.data.appearance.start_time = this.newEvent[0].start.format('kk:mm');
    this.data.appearance.end_time = this.newEvent[0].end.format('kk:mm');
    this.requestService.saveRequest(this.data).subscribe(response => {
    this.router.navigate(['/customer-confirmation']); //how do i route this to a django view url instead???
    
      },
      error => {
        console.log(error);
      });
  }


  //This function is called when a day is clicked on the calendar
  dayClick(event: any) {
    this.errorMsg = "";
    //We only want the view to change if a day is clicked in the month view
    if (event.view.type == "month") {
      this.clickedDay = event.date;
      //Check if its 2 weeks ahead
      if (event.date.isBefore(this.earliestDay, 'day')) {
        this.errorMsg = "Appearances must be scheduled at least two weeks in advance."
      }
      //Switch the view
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
  //This function is called when the user drags a selection around a time.
  //It creates an event on the calendar during that time representing
  //the customer's event.
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
      this.ucCalendar.fullCalendar('removeEventSource', this.newEvent);
      this.ucCalendar.fullCalendar('addEventSource', this.newEvent);
    }
    this.ucCalendar.fullCalendar('refetchEvents');
    this.ucCalendar.fullCalendar('rerenderEvents');
  }
  //This function is called when the user rezises or moves their event
  updateEvent(event: any){
    this.errorMsg = "";
    this.newEvent[0] = event.event;
    this.ucCalendar.fullCalendar("rerenderEvents");
  }
  //This function is called when the user clicks the continue button.
  //They are brought to the empty form with their date and time filled out.
  continueClick(){
    this.data.appearance.date = this.newEvent[0].start.format('YYYY-MM-DD');
    this.data.appearance.start_time = this.newEvent[0].start.format('kk:mm');
    this.data.appearance.end_time = this.newEvent[0].end.format('kk:mm');
    this.locationTypeChange();
    this.showCalendar = false;
  }
  //This function brings the user back to the calendar view from the form
  backToCalendar(){
    this.ucCalendar.fullCalendar('refetchEvents');
    this.ucCalendar.fullCalendar("changeView", "month");
    this.showCalendar = true;
  }

  autocompleteSelect(place){
    this.zone.run(() => {
      console.log(place);
      if (!place.geometry) {
        this.invalidAddr = true;
      }
      else{
        this.invalidAddr = false;
        this.locationAddr = place.formatted_address;
        //This is working around a weird google
        this.form.get('locationAddr').setValue(this.locationAddr);

      }
    });
  }

  clickButton(event){
    console.log(event.data.format());
    if(event.buttonType == "next" || event.buttonType == "prev"){
      if(event.data.isSameOrAfter(moment(),'month')){
        this.getEvents(event.data.year(), event.data.add(1,"M").month());
      }
    }
  }

  locationTypeChange(){
   
    this.onCampus ? ( console.log("On CAMPUS"),this.invalidAddr = false, this.form.get('locationAddr').setValue(""),this.form.get('locationAddr').clearValidators(), this.form.get('location').setValidators([Validators.required])) : 
    (console.log("OFF CAMPUS"),this.form.get('location').setValue(""), this.form.get('location').clearValidators(), this.form.get('locationAddr').setValidators([Validators.required]));
    this.form.get('location').updateValueAndValidity();
    this.form.get('locationAddr').updateValueAndValidity();
    console.log(this.form.get('location'));
    console.log(this.form.get('locationAddr'));
  }

  calculateCost(){

  }

}
