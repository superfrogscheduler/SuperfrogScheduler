import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { getSymbolIterator } from '@angular/core/src/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  superfrog = [{title: 'frontend'}];
  constructor(private api: ApiService) {
    this.getSites();
  }
  getSites = () => {
    this.api.getSite().subscribe(
      data => {
        this.superfrog = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
