import { Component, OnInit } from '@angular/core';
import { ViewAllAppearancesService } from './superfrog-view-assigned-appearances.service'; 
import { Router} from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-superfrog-view-assigned-appearances',
  templateUrl: './superfrog-view-assigned-appearances.component.html',
  styleUrls: ['./superfrog-view-assigned-appearances.component.css']
})
export class SuperfrogViewAssignedAppearancesComponent implements OnInit {
  appearanceData: any = {};
  superfrogData: any = {};
  newVal: number;
  constructor(private assignedAppearances: ViewAllAppearancesService,private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated(2)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 1)
        this.router.navigate(['/admin-landing'])
    }
    this.getAppearances();
    this.getSuperfrogs();
    
  }
  getAppearances() {
    this.assignedAppearances.getAppearances().subscribe(data => {
      this.appearanceData = data;
    });
  }
  public onChange(event): void {  // event will give you full breif of action
    this.newVal = event.target.value;
    console.log(this.newVal);
    this.assignedAppearances.get_by_Superfrog(this.newVal).subscribe(data => {
      this.appearanceData = data;
    });
  }
  getSuperfrogs() {
    this.assignedAppearances.get_Superfrogs().subscribe(data => {
      this.superfrogData = data;
    });
  }
}
