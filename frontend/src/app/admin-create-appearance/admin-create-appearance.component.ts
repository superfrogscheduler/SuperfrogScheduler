import { Component, OnInit, forwardRef, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { RequestForm } from '../request';
import { AdminCreateAppearanceService } from './admin-create-appearance.service';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Event } from '../shared/event';
import * as moment from 'moment';
import { GoogleService } from '../shared/google.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-admin-create-appearance',
  templateUrl: './admin-create-appearance.component.html',
  styleUrls: ['./admin-create-appearance.component.css'],
  providers: [AdminCreateAppearanceService, GoogleService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AdminCreateAppearanceComponent),
    multi: true
  }]
})
export class AdminCreateAppearanceComponent implements OnInit {
  model: RequestForm = {};
  members = [1, 2, 3];
  submitted = false;
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
  
  constructor(private authService: AuthenticationService,private requestService: AdminCreateAppearanceService, private googleService: GoogleService, private zone: NgZone, private router: Router) { }

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
    location: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  })
  ngOnInit() {
    if(!this.authService.isAuthenticated(1)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 2)
        this.router.navigate(['/superfrog-landing'])
    }
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
    this.data.appearance.date = this.form.get('date').value;
    this.data.appearance.start_time = this.form.get('startTime').value;
    this.data.appearance.end_time = this.form.get('endTime').value;
    this.data.appearance.description = this.form.get('description').value;
    console.log(this.data);
    this.requestService.saveRequest(this.data).subscribe(response => {
    this.router.navigate(['/customer-confirmation']); //how do i route this to a django view url instead???
    
      },
      error => {
        console.log(error);
      });
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
