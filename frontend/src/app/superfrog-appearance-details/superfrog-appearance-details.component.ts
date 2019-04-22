import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Superfrog } from '../shared/superfrog';
import { Appearance } from '../shared/appearance';
import { AuthenticationService } from '../authentication/authentication.service';
import { ViewAppearancesDetailsService } from './superfrog-appearance-details.service';
@Component({
  selector: 'app-superfrog-appearance-details',
  templateUrl: './superfrog-appearance-details.component.html',
  styleUrls: ['./superfrog-appearance-details.component.css']
})
export class SuperfrogAppearanceDetailsComponent implements OnInit {
  id: number;
  appearanceData: any = {};
  constructor(private detailService: ViewAppearancesDetailsService, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(!this.authService.isAuthenticated(2)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 1)
        this.router.navigate(['/admin-landing'])
    }
    this.getAppearances();
  }
  getAppearances() {
    this.detailService.getAppearances(this.id).subscribe(data => {
      this.appearanceData = data;
    });
  }
}
