import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../product-service.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{

  @Input() product:any;
  EditForm: FormGroup;
  
  constructor(
    public modal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private sharedService: SharedService
  ) {
    this.EditForm = this.formBuilder.group({
      inventory: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.product) {
      this.EditForm.patchValue({
        inventory: this.product.inventory,
        price: this.product.price
      });
    }
  }
  updateProduct(id:number): void {
    const updatedProduct = this.EditForm.value;
    this.productService.updateProduct(id, updatedProduct).subscribe((response) => {
      console.log(response);
      this.sharedService.refresh();
      this.modal.dismiss();
    }, (error) => {
      console.error(error);
      // handle error here
    });
  }

  

}
