import { Component, OnInit } from '@angular/core';
import {Request} from '../request';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  model = new Request('Sarah', 'Allen', "sarah@allen.com", "2148886754", "12-1-18", "2", "5", "my party", "none", "123 Frog St.", [1,2,3], "Dance a lot", "none", "none", "a great time", "no", false );
  members = ['Superfrog', 'Cheerleaders', 'Showgirls'];
  submitted = false;

  constructor() { }

  ngOnInit() {
  }

}
