import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { Superfrog } from '../shared/superfrog';

@Component({
  selector: 'app-superfrog-settings',
  templateUrl: './superfrog-settings.component.html',
  styleUrls: ['./superfrog-settings.component.css']
})
export class SuperfrogSettingsComponent implements OnInit {

  superfrog: Superfrog

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated(2)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 1)
        this.router.navigate(['/admin-landing'])
    }
    this.getSuperfrog()
  }

  getSuperfrog(){
    this.superfrog = this.authService.getUser('logged')
  }

}
