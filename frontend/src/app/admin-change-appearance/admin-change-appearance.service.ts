import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminChangeService {
  baseurl = "http://3.94.88.53:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  get_Appearances_by_ID(AID: number): Observable<any> {
    return this.http.get(this.baseurl + "SuperFrogappearance/" + AID + "/");
  }
  updateAppearance(req: {}): Observable<any> {
    return this.http.patch(this.baseurl + "updateAppearance/", req);
  }
}
