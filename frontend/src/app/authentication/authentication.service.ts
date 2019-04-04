import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SessionStorage, LocalStorageService} from 'angular-web-storage';
import { Superfrog  } from '../shared/superfrog';
import { User  } from '../shared/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseurl = "http://3.94.88.53:8000/";
  //httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});

  errormessage = "";
  isLoggedIn: number;

  constructor(private http: HttpClient, private storage: LocalStorageService, private router: Router) {
    this.errormessage = '';
    this.isLoggedIn = 0;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.errormessage = 'An error occurred:' + error.error.message;
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.setErrorMessage(error.error.message)
      console.error(
        `Backend returned code ${error.status}, ` +
        `message: error ` + this.errormessage);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  getErrorMessage(){
    return this.errormessage;
  }

  setErrorMessage(msg : string){
    this.errormessage = msg;
  }

  getUser(key) {
    return JSON.parse(this.storage.get(key))
    
  }

  setUser(user, status: number) {
    this.storage.set('logged', JSON.stringify(user))
    this.isLoggedIn = status
    this.storage.set('isLoggedIn', this.isLoggedIn)
  }

  getLoggedInStatus(){
    return this.storage.get('isLoggedIn')
  }

  isAuthenticated(status: number){
    if (this.storage.get('isLoggedIn') != 0) {
      console.log(this.storage.get('isLoggedIn'))
      return (this.storage.get('isLoggedIn')==status)
    } else {
      return false
    }
  }

  isAccessible(status: number){
    if (!this.isAuthenticated(status)){
      if (this.storage.get('isLoggedIn') == 0){
        this.router.navigate(['/auth'])
      } else if (this.storage.get('isLoggedIn') == 1){
        this.router.navigate(['/admin-landing'])
      } else {
        this.router.navigate(['/superfrog-landing'])
      }
    } else {
      console.log(this.isAuthenticated(status))
    }
  }

  clearStorage(){
    this.isLoggedIn = 0;
    this.storage.remove('isLoggedIn')
    this.storage.remove('logged')
    alert(this.storage.get('isLoggedIn'))
  }

  registerSuperfrog(userData): Observable<any> {
    console.log(userData);
    return this.http.post(this.baseurl + "users/", userData);
  }

  getSuperFrog(id: number): Observable<any> {
    return this.http.get(this.baseurl + "employee/" + id + "/").pipe(
      catchError(this.handleError)
    );
  }

  getAdmin(id: number): Observable<any> {
    return this.http.get(this.baseurl + "get-admin/" + id + "/").pipe(
      catchError(this.handleError)
    );
  }

  loginUser(userData): Observable<any> {
    console.log(userData);
    return this.http.post(this.baseurl + "auth/login/", userData).pipe(
      catchError(this.handleError)
    );
  }

}