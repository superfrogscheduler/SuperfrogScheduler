import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { Router} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-superfrog-calendar',
  templateUrl: './superfrog-calendar.component.html',
  styleUrls: ['./superfrog-calendar.component.css']
})
export class SuperfrogCalendarComponent implements OnInit {
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor( private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    //initialize calendar options
    if(!this.authService.isAuthenticated(2)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 1)
        this.router.navigate(['/admin-landing'])
    }
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };
  }

}
