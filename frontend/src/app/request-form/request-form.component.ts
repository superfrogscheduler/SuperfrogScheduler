import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  requestForm = new FormGroup({
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

  });
  constructor() { }

  ngOnInit() {
  }

}
