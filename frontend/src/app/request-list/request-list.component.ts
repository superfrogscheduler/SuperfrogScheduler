import { Component, OnInit } from '@angular/core';
import { RequestListService } from './request-list.service';
import { RequestForm} from '../request'

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css'],
  providers: [RequestListService]
})
export class RequestListComponent implements OnInit {

  requests: RequestForm[]
  constructor(private requestListService: RequestListService) { }

  ngOnInit() {
    this.getRequests();
  }
  getRequests(){
    this.requestListService.getRequests().subscribe(data => this.requests=data);
  }

}
