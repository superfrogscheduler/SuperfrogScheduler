import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseurl = "http://127.0.0.1:8000/";
  //httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
  constructor(private http: HttpClient) { }

  registerSuperfrog(userData): Observable<any> {
    console.log(userData);
    return this.http.post(this.baseurl + "users/", userData);
  }

  loginSuperfrog(userData): Observable<any> {
    console.log(userData);
    return this.http.post(this.baseurl + "auth/", userData);
  }
}