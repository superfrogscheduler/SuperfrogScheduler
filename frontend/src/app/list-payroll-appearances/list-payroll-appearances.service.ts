import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ListPayrollService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAppearances(req: {}): Observable<any> {
    return this.http.get(this.baseurl + "SuperFrogappearance/status/Past/", req);
  }
  get_by_Superfrog(SFID: number): Observable<any> {
    return this.http.get(this.baseurl + "by_Superfrog/status/Past/" + SFID);
  }
  genPayroll( adminID: number, req: {}) {
    return this.http.patch(this.baseurl + "payrollAppearances/" + adminID + "/", req);
  }
}
