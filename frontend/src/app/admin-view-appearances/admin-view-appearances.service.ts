import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ViewAppearancesAdminService {
  baseurl = environment.apiURL;
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getPastAppearances(): Observable<any> {
    return this.http.get(this.baseurl + "superfrogappearances/status/Past/" );
  }
  getAssignedAppearances(): Observable<any> {
    return this.http.get(this.baseurl + "superfrogappearances/status/Assigned/" );
  }

}
