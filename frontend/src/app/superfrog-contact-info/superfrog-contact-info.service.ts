import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperfrogContactInfoService {
  baseurl = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient) { }

  updateContactInfo(userData): Observable<any>{
    return this.http.patch(this.baseurl + "update-contact-info", userData);
  }
  
}
