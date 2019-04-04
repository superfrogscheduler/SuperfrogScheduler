import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListAdminService {
  baseurl = "http://3.94.88.53:800/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAppearances(): Observable<any> {
    return this.http.get(this.baseurl + "appearances/status/Pending/");
  }
}
