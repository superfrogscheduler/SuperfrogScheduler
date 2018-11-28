import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppearanceRequest } from '../models/appearance-request';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  
  requestForm: FormGroup;
  
  members = ['Cheerleaders', 'Showgirls'];

  constructor() { 
    this.requestForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      requestForm: new FormGroup({
        firstName: new FormControl(),
        lastName: new FormControl(),
        date: new FormControl(),
        startTime: new FormControl(),
        endTime: new FormControl(),
        eventTitle: new FormControl(),
        organization: new FormControl(),
        phoneNumber: new FormControl(),
        email: new FormControl(),
        location: new FormControl(),
        specialInstruction: new FormControl(),
        expenses: new FormControl(),
        outsideOrg: new FormControl(),
        description: new FormControl(),
        requiresPerformance: new FormControl(),
        members: new FormControl(),
        onCampus: new FormControl()
      })
    });
  }

  onSubmit() {
    // Make sure to create a deep copy of the form-model
    const result: AppearanceRequest = Object.assign({}, this.requestForm.value);

    console.log(result);

  }

  ngOnInit() {
  }
  
}
