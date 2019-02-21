import { Component, OnInit } from '@angular/core';
import { AppearancesService } from './appearance-detail.service';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-appearance-detail',
  templateUrl: './appearance-detail.component.html',
  styleUrls: ['./appearance-detail.component.css']
})
export class AppearanceDetailComponent implements OnInit {
  id: number;
  getData: any = {};
  constructor(private appearService: AppearancesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id  = this.route.snapshot.params['id'];
    this.getID();
  }
  getID() {
    this.appearService.getID(this.id).subscribe(data => {
      console.log(data);
      this.getData = data;
    });
  }
}
