import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user-service.service';
import { SharedService } from '../shared.service';
import { ModalService } from '../modal.service';
import { CartService } from '../cart.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  searchName: string = '';
  user: any = null;
  cartItemsCount: Observable<number> | undefined;

  private cartItemsCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private router: Router,private userService: UserService,private sharedService: SharedService,private modalService: ModalService,private cartService: CartService) {}

  onSubmit(): void {
    if (this.searchName) {
      this.router.navigate(['/products'], { queryParams: { search: this.searchName } });
    }
  }
  
  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.sharedService.setLoginStatus(this.isLoggedIn());
    this.cartItemsCount = this.cartItemsCountSubject.asObservable();
    this.cartService.cartItemsCount$.subscribe(count => {
      this.cartItemsCountSubject.next(count);
    });
    console.log("count"+this.cartItemsCount)
  }
  isLoggedIn(): boolean {
    return this.user && Object.keys(this.user).length > 0;
  }

  isAdmin(): boolean {
    
    return this.user && this.user.role == 'admin';
  }

  isVendor(): boolean {
    return this.user && this.user.role == 'vendor';
  }
  isClient(): boolean {
    return this.user && this.user.role == 'client';
  }
  signOut(): void {
    this.userService.signOut();
    this.cartService.deleteCart().subscribe({
      complete: () => {
        this.router.navigate(['']);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      },
      error: (err) => {
        console.error('Error deleting cart:', err);
        // Handle error if needed
      }
    });
  }

  openModal() {
    this.modalService.openCart();
  }
  
  
}
