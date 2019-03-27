import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminDetailsService {
  baseurl = "http://3.94.88.53:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getID(id: number): Observable<any> {
    return this.http.get(this.baseurl + "appearances/" + id);
  }
  acceptAppear(id: number, req: {}): Observable<any> {
    return this.http.patch(this.baseurl + "adminAccept/" + id + "/", req);
  }
  rejectAppear(id: number, req: {}): Observable<any> {
    return this.http.delete(this.baseurl + "adminReject/" + id + "/", req);
  }
}
