import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SuperfrogLandingService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAppearances( status: string, sID: number): Observable<any> {
    console.log();
    return this.http.get(this.baseurl + "landingAppearance/status/"+ status + "/" + sID + "/");
  }
}