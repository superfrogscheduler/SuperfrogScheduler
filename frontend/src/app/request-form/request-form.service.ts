import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestForm } from '../request';

@Injectable({
  providedIn: 'root'
})
export class RequestFormService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  saveRequest(req: {}): Observable<any> {
    console.log(req);
    return this.http.post(this.baseurl + "appearances/", req);
  }
  getEvents(year: number, month: number): Observable<any>{
    return this.http.get(this.baseurl + "events/customer-monthly/"+year+"/"+month);
  }
  sendEmail(){
    return this.http.post(this.baseurl + "email/");
  }
}
