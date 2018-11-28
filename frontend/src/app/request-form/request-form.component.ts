import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {Request} from '../request';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {

  model = new Request('Sarah', 'Allen', "sarah@allen.com", "2148886754", "12-1-18", "2", "5", "my party", "none", "123 Frog St.", "Superfrog", "Dance a lot", "none", "none", "a great time", "no", false );
  members = ['Superfrog', 'Cheerleaders', 'Showgirls'];
  submitted = false;

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
  }
  
}
