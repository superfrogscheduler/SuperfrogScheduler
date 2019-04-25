import { Component, OnInit } from '@angular/core';
import { AcceptDetailsService} from './accepted-appearance-details.component.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-accepted-appearance-details',
  templateUrl: './accepted-appearance-details.component.html',
  styleUrls: ['./accepted-appearance-details.component.css']
})
export class AcceptedAppearanceDetailsComponent implements OnInit {
  id: number;
  getData: any = {};
  constructor(private appearService: AcceptDetailsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id  = this.route.snapshot.params['id'];
    this.getID();
  }
  getID() {
    this.appearService.getID(this.id).subscribe(data => {
      this.getData = data;
    });
  }
}
