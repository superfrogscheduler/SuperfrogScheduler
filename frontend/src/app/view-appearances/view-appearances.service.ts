import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListAppearancesService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getPastAppearances(req: {}): Observable<any> {
    console.log(req);
    return this.http.get(this.baseurl + "appearances/status/Completed/", req);
  }
  getAssignedAppearances(req: {}): Observable<any> {
    console.log(req);
    return this.http.get(this.baseurl + "appearances/status/Assigned/", req);
  }
  getAppearances(req: {}): Observable<any> {
    console.log(req);
    return this.http.get(this.baseurl + "appearances/", req);
  }
}
