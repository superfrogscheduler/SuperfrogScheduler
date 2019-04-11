import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewAllAppearancesService {
  baseurl = "http://3.94.88.53:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAppearances(): Observable<any> {
    return this.http.get(this.baseurl + "superfrogappearances/status/Assigned/");
  }
  get_by_Superfrog(SFID: number): Observable<any> {
    return this.http.get(this.baseurl + "by_Superfrog/status/Assigned/" + SFID);
  }
  get_Superfrogs(): Observable<any> {
    return this.http.get(this.baseurl + "get_Superfrogs/");
  }
}
