import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../shared/constants.service';

@Component({
  selector: 'app-instructions-page',
  templateUrl: './instructions-page.component.html',
  styleUrls: ['./instructions-page.component.css']
})
export class InstructionsPageComponent implements OnInit {

  constructor(private constantsService: ConstantsService) { }
  constants = {};
  loading = true;
  ngOnInit() {
    this.constantsService.getConstants().subscribe(data => {
      this.constants = data;
      this.loading = false;
    })
  }

}
