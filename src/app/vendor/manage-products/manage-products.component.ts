import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product-service.service';
import { SharedService } from '../../shared.service';
import { Subscription } from 'rxjs';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {
  Products: any[] = [];
  private subscription: Subscription | undefined;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.subscription = this.sharedService.refreshProducts$.subscribe(() => {
      this.ngOnInit();
    });
    this.route.paramMap.subscribe(params => {
      const vendorId = +params.get('userId')!;
      this.loadProducts(vendorId);
      console.log(this.Products)
    });
  }

  loadProducts(vendorId: number): void {
    this.productService.getProductByVendorId(vendorId).subscribe({
      next: (products: any[]) => this.Products = products,
      error: (err) => console.error('Error fetching products', err)
      
      
    });
  }
  openModal() {
    this.route.paramMap.subscribe(params => {
      const vendorId = +params.get('userId')!;
      this.modalService.addproduct(vendorId);
    });

    
  }

  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      console.log(`Product deleted successfully`);
      this.route.paramMap.subscribe(params => {
        const vendorId = +params.get('userId')!;
        this.loadProducts(vendorId);
      });
    });
  }
}
