import { Component, OnInit, forwardRef, ViewChild, NgZone, ChangeDetectorRef } from '@angular/core';
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
import * as _ from 'lodash';
import { ConstantsService } from '../shared/constants.service';


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
  data: { "customer": Customer, "appearance": Appearance } = { "customer": {}, "appearance": {performance_required: false, cheerleaders: "None", showgirls: "None", org_type:null, cost: 0} };
  clickedDay: any;
  errorMsg: string = "";
  earliestDay: any = moment().add(2, 'weeks').subtract(1, 'day').startOf('day');
  onCampus: boolean = true
  locationAddr: string;
  locationAptNum: string;
  locationName: string;
  invalidAddr: boolean = false;
  events = { id: "events", events: [], editable: false, overlap: false, eventColor: '#4d1979' };
  twoWeek = false;
  newEvent = {id: 'newEvent', events: [] };
  classIntersection: any;
  distance: any;
  hourly: number =0.0;
  spiritSmHourly : number = 0.0;
  spiritLgHourly : number= 0.0;
  duration: number=0;
  loading = true;
  submitting = false;
  modal = 'none';
  constants: any = {
    private_hourly_rate: 0.0,
    public_hourly_rate: 0.0,
    spirit_private_sm_rate: 0.0,
    spirit_private_lg_rate: 0.0,
    spirit_public_sm_rate: 0.0,
    spirit_public_lg_rate: 0.0,
    cost_per_mile: 0.0,
  };
  place: any;
  
  constructor(private constantsService: ConstantsService, private requestService: RequestFormService, private googleService: GoogleService, private zone: NgZone, private router: Router) { }

  onSubmit() {   
    if (this.form.valid) {
      console.log("I'm valid!!");
      this.saveRequest();
    } 
    else {
      Object.keys(this.form.controls).forEach(field => { // {1}
        const control = this.form.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
    }
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    eventTitle: new FormControl('', Validators.required),
    eventType: new FormControl(null, Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    description: new FormControl('', Validators.required),
    locationAddr: new FormControl(''),
    location: new FormControl('', Validators.required),
    agree: new FormControl('', Validators.required),
    termsClicked: new FormControl(false,Validators.requiredTrue)
  });
  ngOnInit() {
    this.constantsService.getConstants().subscribe(c => {
      this.constants = c;
      this.requestService.getClassIntersection().subscribe(data =>{
      this.classIntersection = data;
      this.generateClassEvents(moment().startOf('month'));
      //get preexisting events from the database
      //seeing if this comment will fix our server somehow
      this.requestService.getEvents(this.earliestDay.year(), this.earliestDay.clone().add(1, 'M').month()).subscribe(data => {
        data.forEach(element => {
          this.events.events.push({ title: "Unavailable", start: element.start, end: element.end });
        });
        this.calendarOptions = {
          minTime: this.constants.earliest_appearance_time,
          maxTime: this.constants.latest_appearance_time,
          showNonCurrentDates: false,
          allDaySlot: false,
          defaultDate: this.earliestDay, 
          editable: true,
          eventLimit: false,
          selectable: false,
          selectAllow: (selectinfo) => {
            return selectinfo.end.diff(selectinfo.start,'hours',true)<=this.constants.appearance_max_len;
          },
          selectOverlap: false,
          longPressDelay: 500,
          eventColor: '#4d1979',
          header: {
            left: 'myPrev,myNext',
            center: 'title',
            right: ''
          },
          //block out two weeks before
          eventSources: [[{
            allDay: true,
            start: moment(0),
            end: this.earliestDay.clone().add(1, 'day'),
            rendering: 'background',
            backgroundColor: 'lightgray'
          }],
            this.events,
          ],
          eventOverlap: false,
          customButtons: {
            myNext:{
              text: 'next',
              icon: 'right-single-arrow',
              click: () => {
                this.events.events = [];
                this.ucCalendar.fullCalendar('next');
                let day = this.ucCalendar.fullCalendar('getDate');
                console.log(day.format());
                if(day.isSameOrAfter(moment(),'month')){
                  this.generateClassEvents(day.clone());
                  this.getEvents(day.year(), day.clone().add(1,"M").month());
                }
                this.ucCalendar.fullCalendar("refetchEvents");
              }
            },
            myPrev:{
              text: 'prev',
              icon: 'left-single-arrow',
              click: () => {
                this.events.events = [];
                this.ucCalendar.fullCalendar('prev');
                let day = this.ucCalendar.fullCalendar('getDate');
                console.log(day.format());
                if(day.isSameOrAfter(moment(),'month')){
                  this.generateClassEvents(day.clone());
                  this.getEvents(day.year(), day.clone().add(1,"M").month());
                }
                this.ucCalendar.fullCalendar("refetchEvents");
              }
            },
            back: {
              text: 'back',
              click: () => {
                this.ucCalendar.fullCalendar('option', {
                  header: {
                    left: 'myPrev,myNext',
                    center: 'title',
                    right: ''
                  },
                  selectable: false
                });
                this.ucCalendar.fullCalendar('changeView', 'month');

              }
            }
          }
    
        };
        this.loading = false;
      });
    });

  });
  }

  getEvents(year, month){
    this.requestService.getEvents(year, month).subscribe(data => {
      this.ucCalendar.fullCalendar('removeEventSource', 'events');
      data.forEach(element => {
        this.events.events.push({ title: "SuperFrog is booked", start: element.start, end: element.end })
      });
      this.ucCalendar.fullCalendar('addEventSource',this.events);
      console.log(this.ucCalendar.fullCalendar('getEventSources'));
      });
      
  }

  saveRequest() {
    this.submitting = true;
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
    this.data.appearance.start_time = this.newEvent.events[0].start.format('kk:mm');
    this.data.appearance.end_time = this.newEvent.events[0].end.format('kk:mm');
    this.data.appearance.org_type = this.form.get('eventType').value;
    console.log(this.data);
    this.requestService.saveRequest(this.data).subscribe(response => {
        this.submitting = false;
        this.router.navigate(['/customer-confirmation']); //how do i route this to a django view url instead???
    
      },
      error => {
        this.submitting = false;
        console.log(error);
      });
  }


  //This function is called when a day is clicked on the calendar
  dayClick(event: any) {
    this.errorMsg = "";
    //We only want the view to change if a day is clicked in the month view
    if (event.view.type == "month") {
      //Check if its 2 weeks ahead
      if (event.date.isBefore(this.earliestDay, 'day')) {
        this.errorMsg = "Appearances must be scheduled at least two weeks in advance."
      }
      //Switch the view
      else {
        this.clickedDay = event.date;
        console.log(this.clickedDay.format());
        this.ucCalendar.fullCalendar('option', {
          header: {
            left: 'back',
            center: 'title',
            right: ''
          },
          selectable: true
        });
        this.ucCalendar.fullCalendar('changeView', 'agendaDay', this.clickedDay.format('YYYY-MM-DD'));
      }
    }
  }
  //This function is called when the user drags a selection around a time.
  //It creates an event on the calendar during that time representing
  //the customer's event.
  select(event: any) {
    this.errorMsg = "";
    if (this.newEvent.events.length == 0) {
      this.newEvent.events.push({
        id: "myevent",
        title: "My Event",
        start: event.start,
        end: event.end
      });
      this.ucCalendar.fullCalendar('addEventSource', this.newEvent);
    }
    else {
      this.newEvent.events[0] = {
        id: "myevent",
        title: "My Event",
        start: event.start,
        end: event.end
      };
      this.ucCalendar.fullCalendar('removeEventSource', 'newEvent');
      this.ucCalendar.fullCalendar('addEventSource', this.newEvent);
    }
    this.ucCalendar.fullCalendar('refetchEvents');
    this.ucCalendar.fullCalendar('rerenderEvents');
    //Make sure the window scrolls after the continue button has appeared
    setTimeout(() =>{
      window.scroll({ 
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
      });
    }, 0);
  }
  //This function is called when the user rezises or moves their event
  updateEvent(event: any){
    this.errorMsg = "";
    if(event.event.end.diff(event.event.start,'hours',true)<=this.constants.appearance_max_len){
      this.newEvent.events[0] = event.event;
    }
    else{
      event.revertFunc();
    }

    this.ucCalendar.fullCalendar("rerenderEvents");
  }
  //This function is called when the user clicks the continue button.
  //They are brought to the empty form with their date and time filled out.
  continueClick(){
    this.data.appearance.date = this.newEvent.events[0].start.format('YYYY-MM-DD');
    this.data.appearance.start_time = this.newEvent.events[0].start.format('kk:mm');
    this.data.appearance.end_time = this.newEvent.events[0].end.format('kk:mm');
    this.locationTypeChange();
    this.updateCost();
    this.showCalendar = false;
  }
  //This function brings the user back to the calendar view from the form
  backToCalendar(){
    this.ucCalendar.fullCalendar('refetchEvents');
    this.ucCalendar.fullCalendar('option', {
      header: {
        left: 'myPrev,myNext',
        center: 'title',
        right: ''
      },
      selectable: false
    });
    this.ucCalendar.fullCalendar("changeView", "month");
    this.showCalendar = true;
  }
  autocompleteBlur(){
    if (!this.place || !this.place.geometry) {
      this.invalidAddr = true;
    }
    else{
      this.invalidAddr = false;
    }
  }
  autocompleteFocus(){
    this.place = undefined;
  }
  autocompleteSelect(place){
    this.zone.run(() => {
      console.log(place);
      this.place = place;
      if (!this.place.geometry) {
        this.invalidAddr = true;
      }
      else{
        this.invalidAddr = false;
        this.locationAddr = this.place.formatted_address;

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
          origins: [{lat: 32.7097, lng:-97.3681}],
          destinations: [place.geometry.location],
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        }, (response, status) => {
          this.distance = response.rows[0].elements[0].distance;
          this.data.appearance.mileage = _.round(this.distance.value / 1609.344, 1)*2;
          console.log(this.data.appearance.mileage); 
          this.zone.run(() =>{this.updateCost()});
        });
        //This is working around a weird google bug
        this.form.get('locationAddr').setValue(this.locationAddr);

      }
    });
  }

  locationTypeChange(){
   
    this.onCampus ? ( console.log("On CAMPUS"),this.invalidAddr = false, this.form.get('locationAddr').setValue(""),this.form.get('locationAddr').clearValidators(), this.form.get('location').setValidators([Validators.required])) : 
    (console.log("OFF CAMPUS"),this.form.get('location').setValue(""), this.form.get('location').clearValidators(), this.form.get('locationAddr').setValidators([Validators.required]));
    this.form.get('location').updateValueAndValidity();
    this.form.get('locationAddr').updateValueAndValidity();
    if(this.onCampus){
      this.data.appearance.mileage = 0;
    }
    console.log(this.form.get('location'));
    console.log(this.form.get('locationAddr'));
  }

  generateClassEvents(date: moment.Moment){
    console.log(this.events.events);
    console.log(date);
    let nextMonth = date.clone().add(1, "month");
    let start = date.clone().startOf('week');
    console.log(moment.isMoment(start));
    while(start.isBefore(nextMonth)){
      for(var d in this.classIntersection){
        var day = this.classIntersection[d];
        for(var t in day){
          var time = day[t];
          var s = moment(start.clone().add(d, 'days'));
          s.hours(time['start']['hour']);
          s.minutes(time['start']['minutes']);
          var e = start.clone().add(d, 'days');
          e.hours(time['end']['hour']);
          e.minutes(time['end']['minutes']);
          var event = {
            title: "SuperFrog has class",
            start: s.format("YYYY-MM-DD kk:mm:ss"),
            end: e.format("YYYY-MM-DD kk:mm:ss"),
            allDay: false
          };
          console.log(event);
          this.events.events.push(event);
        }
      }
      start.add(1, 'week');
    }
  }

  updateCost(){
    this.data.appearance.cost = 0;
    this.duration = Math.ceil(this.newEvent.events[0].end.diff(this.newEvent.events[0].start, 'hours', true));
    if(this.form.get('eventType').value == "Private/Business"){
      this.hourly = this.constants.private_hourly_rate;
      this.spiritSmHourly = this.constants.spirit_private_sm_rate;
      this.spiritLgHourly = this.constants.spirit_private_lg_rate;
    }
    else{
      this.hourly = this.constants.public_hourly_rate;
      this.spiritSmHourly = this.constants.spirit_public_sm_rate;
      this.spiritLgHourly = this.constants.spirit_public_lg_rate;
    }
    this.data.appearance.cost += this.duration * this.hourly;
    if(this.data.appearance.cheerleaders == 'Small Team'){
      this.data.appearance.cost += this.duration * this.spiritSmHourly;
    }
    if(this.data.appearance.cheerleaders == 'Large Team'){
      this.data.appearance.cost += this.duration * this.spiritLgHourly;
    }
    if(this.data.appearance.showgirls == 'Small Team'){
      this.data.appearance.cost += this.duration * this.spiritSmHourly;
    }
    if(this.data.appearance.showgirls == 'Large Team'){
      this.data.appearance.cost += this.duration * this.spiritLgHourly;
    }
    if(this.data.appearance.mileage > 2){
      this.data.appearance.cost += _.round(this.data.appearance.mileage*this.constants.cost_per_mile, 2);
    }
    console.log(this.data.appearance.cost);

  }

  modalOpen(){
    this.modal='block';
  }
  modalClose(){
    this.modal='none';
  }
  

}
