import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../shared.service';
import { CartService } from '../cart.service';
import { UserService } from '../user-service.service';
import { ProductService } from '../product-service.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  constructor(private router: Router,public modal: NgbActiveModal,private sharedService: SharedService,private cartService: CartService,private userService: UserService,private productService: ProductService) {}
  loggedIn:any;
  cart: any;
  cartItemsCount: Observable<number> | undefined;

  private cartItemsCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  ngOnInit(): void {
    this.loggedIn=this.sharedService.checkLoginStatus();
    this.viewCart();
    this.cartItemsCount = this.cartItemsCountSubject.asObservable();
    this.cartService.cartItemsCount$.subscribe(count => {
      this.cartItemsCountSubject.next(count);
    });
  }

  navigateAndClose() {
    this.modal.dismiss();
    this.router.navigate(['/signin']);
  }
  checkoutAndClose() {
    this.modal.dismiss();
    this.router.navigate(['/checkout'], { state: { cart: this.cart } });
  }
  
  viewCart(): void {
    this.cartService.viewCart(this.userService.getUser().id).subscribe(
      response => {
        this.cart = response;
        console.log('Cart:', this.cart);
      },
      error => {
        console.error('Error retrieving cart:', error);
      }
    );
  }
  removeFromCart(cartItemId: number,productId:Number): void {
    this.cartService.removeFromCart(cartItemId,productId).subscribe({
      next: (response) => {
        console.log('Item removed from cart:', response);
        this.viewCart();
        // Optionally, update the view or refresh the list
      },
      error: (error) => {
        console.error('Error:', error);
        alert('Error removing item');
      }
    });
  }
  onRemoveItem(productId:any): void {
    this.cartService.updateCart(this.cart.cartId, productId, -1).subscribe(
      response => {
        console.log('Cart updated:', response);
        this.viewCart();
        // You might want to add logic to update the UI or local state here
      },
      error => {
        console.error('Error updating cart:', error);
      }
    );
  }

  onAddItem(productId:any): void {
    this.cartService.updateCart(this.cart.cartId, productId, 1).subscribe(
      response => {
        console.log('Cart updated:', response);
        this.viewCart();
        // You might want to add logic to update the UI or local state here
      },
      error => {
        console.error('Error updating cart:', error);
      }
    );
  }
  
 

}
