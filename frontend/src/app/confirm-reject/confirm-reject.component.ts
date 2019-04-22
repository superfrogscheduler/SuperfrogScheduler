import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-confirm-reject',
  templateUrl: './confirm-reject.component.html',
  styleUrls: ['./confirm-reject.component.css']
})
export class ConfirmRejectComponent implements OnInit {

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated(1)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 2)
        this.router.navigate(['/superfrog-landing'])
    }
  }
}
