import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuperfrogClassScheduleService {
  baseurl = environment.apiURL;

  constructor(private http: HttpClient) { }

  getSchedule(id: number): Observable<any>{
    return this.http.get(this.baseurl+"class-schedule/"+id+"/");
  }

  saveChanges(id: number, changes: any): Observable<any>{
    return this.http.patch(this.baseurl+"class-schedule/"+id+"/", changes);
  }


}
