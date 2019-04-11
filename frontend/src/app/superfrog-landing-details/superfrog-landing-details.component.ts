import { Component, OnInit } from '@angular/core';
import { SuperfrogLandingDetailsService} from './superfrog-landing-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../shared/customer';
import { Appearance } from '../shared/appearance';

@Component({
  selector: 'app-superfrog-landing-details',
  templateUrl: './superfrog-landing-details.component.html',
  styleUrls: ['./superfrog-landing-details.component.css']
})
export class SuperfrogLandingDetailsComponent implements OnInit {
  id: number;
  landingData: any = {}; // Holds appearance details
  data: {"customer": Customer, "appearance": Appearance} = {"customer":{}, "appearance": {}};
  constructor(private landingDetailsService: SuperfrogLandingDetailsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']; //Sent from the super-landing component, the appearance ID
                                                //determined by which appearance the user wants details on
    this.getID();
  }
  getID() {//Get appearance details from the ID sent from superfrog-landing component
    this.landingDetailsService.getID(this.id).subscribe(data => {
      this.landingData = data;
    });
  }
}
