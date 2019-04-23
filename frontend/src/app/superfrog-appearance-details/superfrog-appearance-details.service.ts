import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ViewAppearancesDetailsService {
  baseurl = environment.apiURL;
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }
  getAppearances(id: number): Observable<any> {
    return this.http.get(this.baseurl + "superfrogappearancedetails/" + id);
  }
}