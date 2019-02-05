import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SignUpService {
    baseurl = "http://127.0.0.1:8000/";
    id: string;
    httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
    constructor(private http: HttpClient) { }
    getSuperFrog(req: {}): Observable<any> {
      console.log(req);
      return this.http.get(this.baseurl + "employees/", req);
    }
    getID(id: number): Observable<any> {
      return this.http.get(this.baseurl + "appearances/" + id);
    }
    signUp(id: number, req: {}): Observable<any> {
      return this.http.patch(this.baseurl + "employeeAppearance/" + id + "/", req);
    }
  }
