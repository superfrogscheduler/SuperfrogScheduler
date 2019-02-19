import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseurl = "http://127.0.0.1:8000/";
  //httpHeaders = new HttpHeaders({'Content.Type': 'application/json'});

  errormessage = "";

  constructor(private http: HttpClient) {
    this.errormessage = '';
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

  registerSuperfrog(userData): Observable<any> {
    console.log(userData);
    return this.http.post(this.baseurl + "users/", userData);
  }

  loginSuperfrog(userData): Observable<any> {
    console.log(userData);
    return this.http.post(this.baseurl + "auth/login/", userData).pipe(
      catchError(this.handleError)
    );
  }
}