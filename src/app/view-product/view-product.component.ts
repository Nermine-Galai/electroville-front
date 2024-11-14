import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user-service.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent implements OnInit {
  @Input() product:any;
  user:any;
  constructor(public modal: NgbActiveModal,private userService: UserService, private cartService:CartService) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  addToCart(productId:Number,price:any): void {
    const cartItem = { productId: productId, price: price };
    this.user=this.userService.getUser();
    this.cartService.addToCart(cartItem, this.user.id).subscribe(
      response => {
        console.log(response);
        
      },
      error => {
        console.error(error);
      }
    );
  }
  isLoggedIn(): boolean {
    return this.user && Object.keys(this.user).length > 0;
  }

  isClient(): boolean {
    return this.user && this.user.role == 'client';
  }

}
