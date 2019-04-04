import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperfrogContactInfoService {
  baseurl = "http://127.0.0.1:8000/";
  httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }

  updateContact(sID: number, req: {}): Observable<any> {
    console.log(req);
    return this.http.patch(this.baseurl + "superfrog-contact-info/" + sID + "/", req);
  }
}
