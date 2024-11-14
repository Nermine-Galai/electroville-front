import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product-service.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css'
})
export class NewProductsComponent implements OnInit {
  recentApprovedProducts: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getRecentApprovedProducts().subscribe(
      (products) => {
        this.recentApprovedProducts = products;
      },
      (error) => {
        console.error('Error fetching recent approved products', error);
      }
    );
  }
}
