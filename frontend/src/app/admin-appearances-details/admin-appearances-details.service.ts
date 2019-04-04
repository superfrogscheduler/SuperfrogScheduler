import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminAppearancesDetailsService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAppearances(): Observable<any> {
    return this.http.get(this.baseurl + "SuperFrogappearance/status/Assigned/");
  }
  get_by_Superfrog(SFID: number): Observable<any> {
    return this.http.get(this.baseurl + "by_Superfrog/status/Assigned/" + SFID);
  }
}
