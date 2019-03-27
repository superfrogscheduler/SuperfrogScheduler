import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestForm} from '../request'

@Injectable({
  providedIn: 'root'
})
export class RequestListService {
  baseurl = "http://3.94.88.53:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getRequests(): Observable<RequestForm[]> {
    return this.http.get<RequestForm[]>(this.baseurl + "appearances/status/Pending");
  }
}