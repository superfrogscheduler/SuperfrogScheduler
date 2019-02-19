import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  private key = "AIzaSyCFZ3KG61ZT3JcKB1fkwu4i_8feOhPHLYsAIzaSyCFZ3KG61ZT3JcKB1fkwu4i_8feOhPHLYs"
  constructor(private http: HttpClient) { }

  getAutocomplete(input: string): Observable<any>{
    return this.http.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+ input +"&types=address&location=32.7097,-97.3681&radius=160934&key="+this.key);
  }
}
