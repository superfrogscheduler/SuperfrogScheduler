import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SuperfrogLandingService {
  baseurl = environment.apiURL;
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAppearances( status: string, sID: number): Observable<any> { //Get Superfrog's assigned appearances
    console.log();
    return this.http.get(this.baseurl + "landingAppearance/status/"+ status + "/" + sID + "/");
  }
}
