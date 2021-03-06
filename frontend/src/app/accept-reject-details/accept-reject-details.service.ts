import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDetailsService {
  baseurl = environment.apiURL;
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getID(id: number): Observable<any> {
    return this.http.get(this.baseurl + "appearances/" + id);
  }
  acceptAppear(id: number, req: {}): Observable<any> {
    return this.http.patch(this.baseurl + "adminAccept/" + id + "/", req);
  }
  rejectAppear(id: number, reason: String): Observable<any> {
    return this.http.patch(this.baseurl + "adminReject/" + id + "/", reason);
  }
}
