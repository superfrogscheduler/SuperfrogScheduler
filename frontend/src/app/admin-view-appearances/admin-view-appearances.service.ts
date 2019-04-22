import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ViewAppearancesAdminService {
  baseurl = "http://3.94.88.53:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getPastAppearances(): Observable<any> {
    return this.http.get(this.baseurl + "superfrogappearances/status/Past/" );
  }
  getAssignedAppearances(): Observable<any> {
    return this.http.get(this.baseurl + "superfrogappearances/status/Assigned/" );
  }

}
