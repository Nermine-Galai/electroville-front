import { Component, Input } from '@angular/core';
import { ManageProductsComponent } from '../manage-products/manage-products.component';
import { ModalService } from '../../modal.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardsComponent {
  constructor(private parent : ManageProductsComponent,private modalService: ModalService) { }

    @Input() product: any;

    deleteProduct(id: number): void {
      this.parent.deleteProduct(id);
    }

    openModal(product :any) {
      this.modalService.editproduct(product);
      console.log(product)
    }

    viewProduct(product :any) {
      this.modalService.viewproduct(product);
      console.log(product)
    }

  
}
