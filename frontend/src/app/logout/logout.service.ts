import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SessionStorage, LocalStorageService} from 'angular-web-storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  baseurl = "http://127.0.0.1:8000/";

  constructor(private http: HttpClient, private storage: LocalStorageService, private router: Router) {
    
  }

  logoutUser(userData): Observable <any> {
    return this.http.post(this.baseurl + "auth/logout/",userData);
  }
}
