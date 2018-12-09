import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {RequestForm} from '../request';
import { RequestFormService } from './request-form.service';

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

  model: RequestForm = {};
  members = ['Superfrog', 'Cheerleaders', 'Showgirls'];
  submitted = false;

  constructor(private requestService: RequestFormService){}

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    let model = {};
  }

  saveRequest(){
    console.log("Save Request");
    //this.requestService.saveRequest(this.model).subscribe();
  }
  
}
