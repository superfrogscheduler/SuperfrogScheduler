import { Component, OnInit, forwardRef, ViewChild, NgZone } from '@angular/core';
import { SuperfrogContactInfoService } from './superfrog-contact-info.service';
import { Superfrog } from '../shared/superfrog';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-superfrog-contact-info',
  templateUrl: './superfrog-contact-info.component.html',
  styleUrls: ['./superfrog-contact-info.component.css'],
  providers: [SuperfrogContactInfoService, {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SuperfrogContactInfoComponent),
    multi: true
  }]
})
export class SuperfrogContactInfoComponent implements OnInit {

  constructor(private requestService: SuperfrogContactInfoService,  private zone: NgZone, private router: Router, private authService: AuthenticationService) { }
  model: Superfrog = {};
  superfrog: Superfrog;
  data: any = {};
  getData: any = {};
  superfrogId: number;

    // TODO: Remove this when we're done
    get diagnostic() { return JSON.stringify(this.model); }
    form = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
    })

  ngOnInit() {
    this.superfrog = {};
    this.getSuperFrogId();
  }

  getSuperFrogId() {
    this.superfrogId = this.authService.getUser('logged').id;
  }

  updateContact() {
    this.requestService.updateContact(this.superfrogId, this.data).subscribe(response => {
    //this.router.navigate(['/customer-confirmation']); //how do i route this to a django view url instead???
    
      },
      error => {
        console.log(error);
      });
  }

}
