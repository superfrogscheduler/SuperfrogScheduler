import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private links = new Array<{text: string, path:string}>();
  private isLoggedIn = new Subject<boolean>();

  constructor(private authService: AuthenticationService) { 
    this.addItem({text: 'Login', path: 'auth'});
    this.addItem({text: 'Home', path: ''});
    
    if (this.authService.getLoggedInStatus() == 1 ){
      this.updateNavAfterAuth('admin')
     
    } else if (this.authService.getLoggedInStatus() == 2 ){
      this.updateNavAfterAuth('user')
    }
    this.isLoggedIn.next(false);
  }

  getLinks(){
    return this.links;
  }

  getLoginStatus(){
    return this.isLoggedIn;
  }

  updateLoginStatus(status: boolean){
    this.isLoggedIn.next(status);

    if (!status) {
      this.clearAllItems();
      this.addItem({text: 'Login', path: 'auth'});
      this.addItem({text: 'Home', path: ''});
    }
  }

  updateNavAfterAuth(role: string): void {
    this.removeItem({text: 'Login'});
    this.removeItem({text: 'Home'});

    if(role === 'user'){
      this.addItem({text: 'Home', path: 'superfrog-landing'});
      this.addItem({text: 'Sign Up', path: 'list-appearances'});
      this.addItem({text: 'Appearances', path: 'view-appearance'});
      this.addItem({text: 'Settings', path: 'superfrog-settings'});
    } else if (role === 'admin'){
      this.addItem({text: 'Home', path: 'admin-landing'});
      this.addItem({text: 'Appearances', path: 'admin-view-appearances'});
      this.addItem({text: 'Requests', path: 'list-accept-reject'});
      this.addItem({text: 'Payroll', path: 'list-payroll-appearances'});
      this.addItem({text: 'Settings', path: 'admin-settings'});
    }
  }

  addItem({text, path}){
    this.links.push({text: text, path: path});
  }

  removeItem({text}){
    this.links.forEach((link, index) => {
      if (link.text === text) {
        this.links.splice(index, 1);
      }
    });
  }

  clearAllItems(){
    this.links.length = 0;
  }

}
