import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accept-form',
  templateUrl: './accept-form.template.html',
  styleUrls: ['./accept-form.component.css']
})
export class AcceptFormComponent implements OnInit {

    formGroup = null;
  constructor() { }

  ngOnInit() {
  }

}