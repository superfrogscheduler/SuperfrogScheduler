import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Headers, RequestOptions, ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ListPayrollService {
  baseurl = "http://3.94.88.53:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAppearances(req: {}): Observable<any> {
    return this.http.get(this.baseurl + "SuperFrogappearance/status/Past/", req);
  }
  get_by_Superfrog(SFID: number): Observable<any> {
    return this.http.get(this.baseurl + "by_Superfrog/status/Past/" + SFID);
  }
  genPayroll( adminID: number, req: {}) {
    return this.http.patch(this.baseurl + "payrollAppearances/" + adminID + "/" , req, { responseType: "blob" });
  }
  get_Superfrogs(): Observable<any> {
    return this.http.get(this.baseurl + "get_Superfrogs/");
  }
  filter_SuperfrogAppearance( start_date: Date, end_time: Date): Observable<any> {
    return this.http.get(this.baseurl + "filter_by_Superfrog_Date/" + start_date + "/" + end_time + "/");
  }
}
