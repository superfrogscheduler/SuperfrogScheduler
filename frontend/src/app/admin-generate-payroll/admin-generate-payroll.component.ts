import { Component, OnInit } from '@angular/core';
import { Superfrog } from '../shared/superfrog';
import { Appearance } from '../shared/appearance';
import { Admin } from '../shared/admin';
import { PayrollService } from './admin-generate-payroll.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
@Component({
  selector: 'app-admin-generate-payroll',
  templateUrl: './admin-generate-payroll.component.html',
  styleUrls: ['./admin-generate-payroll.component.css']
})
export class AdminGeneratePayrollComponent implements OnInit {
  payrollData: any = {};
  id: number;
  SFAid: number;
  admin: Admin;
  adminID: number;
  data: { "appearance": Appearance, "superfrog": Superfrog} = { "appearance": {}, "superfrog": {}};
  constructor(private pService: PayrollService,private router: Router, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(!this.authService.isAuthenticated(1)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 2)
        this.router.navigate(['/superfrog-landing'])
    }
    this.admin = {};
    this.getID();
    this.getAdmin();
  }
  getID() {
    this.pService.getID(this.id).subscribe(data => {
      this.payrollData = data;
      this.SFAid = data.id;
    });
  }
  getAdmin() {
    this.adminID = this.authService.getUser('logged').user.id;
    console.log(this.adminID);
  }
  genPayroll() {
    this.pService.genPayroll( this.SFAid, this.adminID, this.data).subscribe(data => {
      this.payrollData = data;
    });
  }
}
