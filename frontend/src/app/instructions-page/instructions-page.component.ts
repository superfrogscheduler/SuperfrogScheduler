import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';

@Component({
  selector: 'app-instructions-page',
  templateUrl: './instructions-page.component.html',
  styleUrls: ['./instructions-page.component.css']
})
export class InstructionsPageComponent implements OnInit {

  constructor(private constantsService: ConstantsService) { }
  constants: any = {
    private_hourly_rate: 0.0,
    public_hourly_rate: 0.0,
    spirit_private_sm_rate: 0.0,
    spirit_private_lg_rate: 0.0,
    spirit_public_sm_rate: 0.0,
    spirit_public_lg_rate: 0.0,
    cost_per_mile: 0.0,
  };
  loading = true;
  ngOnInit() {
    this.constantsService.getConstants().subscribe(data => {
      this.constants = data;
      this.loading = false;
    })
  }

}
