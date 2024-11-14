import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';
import { CartService } from '../cart.service';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit{
  @Input() product: any;
  user: any | undefined;
  constructor(private modalService: ModalService,private cartService: CartService,private userService:UserService){}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  viewProduct(product :any) {
    this.modalService.viewproduct(product);
    console.log(product)
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
