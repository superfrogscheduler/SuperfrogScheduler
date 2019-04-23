import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestForm } from '../request';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestFormService {
  baseurl = environment.apiURL;
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  saveRequest(req: {}): Observable<any> {
    console.log(req);
    return this.http.post(this.baseurl + "appearances/", req);
  }
  getEvents(year: number, month: number): Observable<any>{
    return this.http.get(this.baseurl + "events/customer-monthly/"+year+"/"+month);
  }
  sendEmail(req: {}): Observable<any> {
    console.log('about to call email url.');
    return this.http.post(this.baseurl + "email/", req);
  }
  getClassIntersection(): Observable<any>{
    return this.http.get(this.baseurl+"class-schedule-intersection/")
  }
}
