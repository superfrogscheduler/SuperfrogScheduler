import { Component, OnInit, forwardRef } from '@angular/core';
import { SignUp } from '../super-frog-signup';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Event } from '../shared/event';
import { SignUpService} from './super-frog-signup.service';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Superfrog } from '../shared/superfrog';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-super-frog-signup',
  templateUrl: './super-frog-signup.component.html',
  styleUrls: ['./super-frog-signup.component.css'],
  providers: [SignUpService,     {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuperFrogSignupComponent),
    multi: true
  }]
})
export class SuperFrogSignupComponent implements OnInit {
  model: SignUp = {};
  members = [1, 2, 3];
  signedUp = false;
  superfrog: Superfrog;
  data: any = {};
  getData: any = {};
  id: number; //appearance id
  superfrogId: number;

  constructor(private signUpService: SignUpService, private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

  onSignedUp() {this.signedUp = true; }

  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(!this.authService.isAuthenticated(2)){
      if(this.authService.isLoggedIn == 0)
        this.router.navigate(['/'])
      else if (this.authService.isLoggedIn == 1)
        this.router.navigate(['/admin-landing'])
    }
    this.superfrog = {};
    this.getSuperFrogId();
    //this.getSuperfrog();
    this.getID();
  }
  // getSuperfrog() {
  //   this.signUpService.getSuperFrog(this.data).subscribe(data => {
  //     this.getData = data;
  //   });
  // }
  getID() {
    this.signUpService.getID(this.id).subscribe(data => {
      console.log(data);
      this.getData = data;
    });
  }

  getSuperFrogId() {
    this.superfrogId = this.authService.getUser('logged').user.id;
  }
  
  signUp() {
    this.signUpService.signUp(this.id, this.superfrogId, this.data).subscribe(data => {
      this.data = data;
    });
    this.router.navigate(['/confirm-signup']);
  }
}
