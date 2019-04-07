import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SignUpService {
    baseurl = "http://3.94.88.53:8000/";
    id: string;
    httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});
    constructor(private http: HttpClient) { }

    getSuperFrog(): Observable<any> {
      
      return this.http.get(this.baseurl + "employees/");
    }
    
    getID(id: number): Observable<any> {
      return this.http.get(this.baseurl + "appearances/" + id);
    }
    signUp(id: number, sID: number, req: {}): Observable<any> {
      return this.http.patch(this.baseurl + "employeeAppearance/" + id + "/" + sID + "/", req);
    }
  }
