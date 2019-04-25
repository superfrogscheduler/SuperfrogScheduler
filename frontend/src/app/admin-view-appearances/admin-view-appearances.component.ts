import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { Router } from '@angular/router';
import { ViewAppearancesAdminService } from './admin-view-appearances.service';
import { Appearance } from '../shared/appearance';
import { Superfrog } from '../shared/superfrog';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-admin-view-appearances',
  templateUrl: './admin-view-appearances.component.html',
  styleUrls: ['./admin-view-appearances.component.css']
})
export class AdminViewAppearancesComponent implements OnInit {
  appearances = [];
  calendarOptions: Options;
  chooseDate: any;
  data: { "appearance": Appearance, "superfrog": Superfrog} = { "appearance": {}, "superfrog": {}};
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(private authService: AuthenticationService, private adminView: ViewAppearancesAdminService, private router: Router) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated(1)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 2)
        this.router.navigate(['/superfrog-landing'])
    }
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prevYear,nextYear',
        center: 'title',
        right: 'prev,next'
      },
      selectable: true,
      events: this.appearances,
      defaultView: 'listMonth'
    };
    this.getAssignedAppearance();
  }
  getAcceptedAppearance() {
    this.appearances.length = 0;
    this.adminView.getAcceptedAppearances().subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          id: element.id,
          title: element.name,
          start: "" + element.date + " " + element.start_time,
          end: ""+ element.date + " " + element.end_time, 
          superfrog: null
        });   
      });
      this.ucCalendar.fullCalendar('removeEvents');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.appearances);
      this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }
  getAssignedAppearance() {
    this.appearances.length = 0;
    this.adminView.getAssignedAppearances().subscribe(data => {
      data.forEach(element => {
        this.appearances.push({
          id: element.id,
          title: element.appearance.name,
          start: "" + element.appearance.date + " " + element.appearance.start_time,
          end: ""+ element.appearance.date + " " + element.appearance.end_time, 
          superfrog: "" + element.superfrog.user.first_name + "" + element.superfrog.user.last_name
        });   
      });
      this.ucCalendar.fullCalendar('removeEvents');
      this.ucCalendar.fullCalendar('removeEventSources');
      this.ucCalendar.fullCalendar('addEventSource', this.appearances);
      this.ucCalendar.fullCalendar('rerenderEvents');
    });
  }
  eventClick(event: any) {
    if (event.event.superfrog != null) {
      this.router.navigate(['/admin-change-appearances/' + event.event.id ]);
      }
    if (event.event.superfrog == null) {
      this.router.navigate(['accepted-appearance-details/' + event.event.id]);   
    }
  }
  onChangeDate() {
    this.ucCalendar.fullCalendar('gotoDate', this.chooseDate);
  }
}
