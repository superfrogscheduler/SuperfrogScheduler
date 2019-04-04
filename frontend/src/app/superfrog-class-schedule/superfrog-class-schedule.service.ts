import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperfrogClassScheduleService {
  baseurl = "http://3.94.88.53:800/";

  constructor(private http: HttpClient) { }

  getSchedule(id: number): Observable<any>{
    return this.http.get(this.baseurl+"class-schedule/"+id+"/");
  }

  saveChanges(id: number, changes: any): Observable<any>{
    return this.http.patch(this.baseurl+"class-schedule/"+id+"/", changes);
  }


}
