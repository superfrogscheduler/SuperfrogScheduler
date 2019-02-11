import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { Appearance } from '../shared/appearance';
import { Customer } from '../shared/customer';
import { ListAppearancesService } from './view-appearances.service';
import { from } from 'rxjs';
import * as moment from 'moment/moment.js';

@Component({
  selector: 'app-view-appearances',
  templateUrl: './view-appearances.component.html',
  styleUrls: ['./view-appearances.component.css']
})
export class ViewAppearancesComponent implements OnInit {
  data: { "appearance": Appearance, "customers": Customer} = { "appearance": {}, "customers": {}};
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private listService: ListAppearancesService) { }

  ngOnInit() {
    this.calendarOptions = {
      editable: false,
      eventLimit: false,
      selectOverlap: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'listYear,listMonth,listWeek,listDay'
      },
      selectable: true,
      events: [],
      defaultView: 'listWeek',
      eventOverlap: false,
    };
  }
  getPastAppearance() {
    this.listService.getPastAppearances(this.data).subscribe();
  }
  getAssignedAppearance() {
    this.listService.getAssignedAppearances(this.data).subscribe();
  }
}
