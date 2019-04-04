import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListAppearancesService {
  baseurl = "http://3.94.88.53:8000";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getPastAppearances(sID: Number): Observable<any> {
    return this.http.get(this.baseurl + "listAppearances/status/Completed/" + sID + "/");
  }
  getAssignedAppearances(sID: Number): Observable<any> {
    return this.http.get(this.baseurl + "listAppearances/status/Assigned/" + sID + "/");
  }
  getID(id: number): Observable<any> {
    return this.http.get(this.baseurl + "appearances/" + id);
  }
  getAppearances(): Observable<any> {
    return this.http.get(this.baseurl + "appearances/status/Assigned" );
  }
}
