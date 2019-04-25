import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AdminChangeService {
  baseurl = environment.apiURL;
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  get_Appearances_by_ID(AID: number): Observable<any> {
    return this.http.get(this.baseurl + "SuperFrogappearance/" + AID + "/");
  }
  updateAppearance(req: {}): Observable<any> {
    return this.http.patch(this.baseurl + "updateAppearance/", req);
  }
}
