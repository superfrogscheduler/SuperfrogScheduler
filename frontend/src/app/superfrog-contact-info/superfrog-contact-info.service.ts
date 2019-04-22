import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperfrogContactInfoService {
  baseurl = "http://3.94.88.53:8000/";

  constructor(private http: HttpClient) { }

}
