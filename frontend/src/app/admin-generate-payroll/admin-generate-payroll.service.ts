import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {
  baseurl = environment.apiURL;
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getID(id: number): Observable<any> {
    return this.http.get(this.baseurl + "appearance/" + id);
  }
  genPayroll(  SFAid: number, adminID: number, req: {}) {
    return this.http.patch(this.baseurl + "payrollAppearances/" + SFAid + "/" + adminID + "/", req);
  }
}
