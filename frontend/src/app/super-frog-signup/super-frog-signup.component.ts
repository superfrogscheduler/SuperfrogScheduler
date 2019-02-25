import { Component, OnInit, forwardRef } from '@angular/core';
import { SignUp } from '../super-frog-signup';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';
import { Event } from '../shared/event';
import { SignUpService} from './super-frog-signup.service';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Superfrog } from '../shared/superfrog';

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
  data: {"customers": Customer, "appearance": Appearance, "superfrog": Superfrog} = {"customers":{}, "appearance":{}, "superfrog": {}};
  putdata: { "appearance": Appearance, "superfrog": Superfrog} = { "appearance":{}, "superfrog": {}};
  getData: any = {};
  id: number;
  constructor(private signUpService: SignUpService, private route: ActivatedRoute) { }

  onSignedUp() {this.signedUp = true; }

  get diagnostic() { return JSON.stringify(this.model); }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getSuperfrog();
    this.getID();
  }
  getSuperfrog() {
    this.signUpService.getSuperFrog(this.data).subscribe(data => {
      this.getData = data;
    });
  }
  getID() {
    this.signUpService.getID(this.id).subscribe(data => {
      console.log(data);
      this.getData = data;
    });
  }
  signUp() {
    this.signUpService.signUp(this.id, this.data).subscribe(data => {
      console.log(data);
      this.getData = data;
    });
  }
}