import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsModalComponent } from './admin/requests-modal/requests-modal.component';
import { ImageModalComponent } from './admin/image-modal/image-modal.component';
import { InvoiceComponent } from './vendor/invoice/invoice.component';
import { EditProductComponent } from './vendor/edit-product/edit-product.component';
import { AddProductComponent } from './vendor/add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { CartComponent } from './cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  
  

  constructor(private modalService: NgbModal) { }

  openMyModal() {
    this.modalService.open(RequestsModalComponent, { centered: true });
  }
  openImg(imageUrl: string) {
    const modalRef = this.modalService.open(ImageModalComponent);
    modalRef.componentInstance.imageUrl = imageUrl; // Pass the imageUrl to the modal component
  }
  showinvoice(order: any,vendorId: Number) {
    const modalRef = this.modalService.open(InvoiceComponent, { centered: true });
    modalRef.componentInstance.order = order;
    modalRef.componentInstance.vendorId = vendorId;
  }

  editproduct(product:any) {
    const modalRef = this.modalService.open(EditProductComponent, { centered: true });
    modalRef.componentInstance.product = product;
  }

  addproduct(vendorId:Number) {
    const modalRef = this.modalService.open(AddProductComponent, { centered: true });
    modalRef.componentInstance.vendorId = vendorId;
  }

  viewproduct(product:any) {
    const modalRef = this.modalService.open(ViewProductComponent, { centered: true });
    modalRef.componentInstance.product = product;
  }

  openCart() {
    const modalRef = this.modalService.open(CartComponent, { centered: true });
  }
}
