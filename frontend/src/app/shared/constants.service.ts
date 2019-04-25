import { Injectable } from '@angular/core';
import { environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  baseurl = environment.apiURL;
  constructor(private http: HttpClient) { }
  getConstants(){
    return this.http.get(this.baseurl+'constants/');
  }
}
