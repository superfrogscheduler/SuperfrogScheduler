import { Component, OnInit } from '@angular/core';
import { RequestListService } from './request-list.service';
import { RequestForm} from '../request'
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
  providers: [RequestListService]
})
export class RequestListComponent implements OnInit {

  requests: RequestForm[]
  constructor(private requestListService: RequestListService,private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated(1)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 2)
        this.router.navigate(['/superfrog-landing'])
    }
    this.getRequests();
  }
  getRequests(){
    this.requestListService.getRequests().subscribe(data => this.requests=data);
  }

}
