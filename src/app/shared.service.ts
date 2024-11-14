import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private approvalSubject = new Subject<number>();
  private refreshProducts = new Subject<void>();
  isLoggedIn: any;

  constructor() { }
  approvalObservable = this.approvalSubject.asObservable();
  refreshProducts$ = this.refreshProducts.asObservable();

  announceApproval(userId: number) {
    this.approvalSubject.next(userId);
    
  }
  refresh() {
    this.refreshProducts.next();
  }
  checkLoginStatus(): boolean {
    return this.isLoggedIn;
  }

  setLoginStatus(status: boolean) {
    this.isLoggedIn = status;
  }
  

 

}