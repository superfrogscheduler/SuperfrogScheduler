import { Component, OnInit } from '@angular/core';
import {RequestForm} from '../request';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  model: RequestForm;
  members = ['Superfrog', 'Cheerleaders', 'Showgirls'];
  submitted = false;

  constructor() { }

  ngOnInit() {
  }

}
