import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../modal.service';
import { ProductService } from '../../product-service.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../user-service.service';

@Component({
  selector: 'app-approve-products',
  templateUrl: './approve-products.component.html',
  styleUrl: './approve-products.component.css'
})
export class ApproveProductsComponent implements OnInit {
  constructor(private modalService: ModalService, private userService: UserService,private productService: ProductService, private datePipe: DatePipe) { }
  PendingProducts: any[] = [];

  openModal(enlargedImageUrl: string) {
    this.modalService.openImg(enlargedImageUrl); // Pass the URL to the modal service
  }
  ngOnInit(): void {
   this.getPendingProducts()
  }
  getPendingProducts(): void {
    this.productService.getProductByStatus("pending").subscribe(
      products => {
        this.PendingProducts = products.map((product: { dateadded: string | number | Date; }) => ({
          ...product,
          dateadded: this.datePipe.transform(product.dateadded, 'short')
          
        }));
        console.log(this.PendingProducts)
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }
  approveProduct(id: number): void {
    this.productService.approveProduct(id)
      .subscribe(
        (updatedProduct: any) => {
          // Optionally update the local list of products or handle success
          console.log('Product approved successfully:', updatedProduct);
          // Refresh the list of products after approval
          this.getPendingProducts();
        },
        (error) => {
          console.error('Error approving product:', error);
          // Handle error response as needed
        }
      );
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId)
      .subscribe(
        () => {
          console.log('Product deleted successfully');
          // Optionally, refresh the products list after deletion
          this.getPendingProducts();
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
  }
}
