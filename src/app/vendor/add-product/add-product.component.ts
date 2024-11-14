import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../product-service.service';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {
  @Input() vendorId : any;
  addForm : FormGroup;
  pictureValidationError = '';
  
  
  pictures: { file: any; preview: string | ArrayBuffer | null }[] = [];
  constructor(public modal: NgbActiveModal,private formBuilder: FormBuilder,private productService: ProductService,private sharedService: SharedService){
    
    this.addForm = this.formBuilder.group({
      inventory: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
      pictures: new FormControl([])
      
    });
  }
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this.formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.pictures.push({
          file: file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  }

  removePicture(index: number): void {
    this.pictures.splice(index, 1);
  }
  validatePictures() {
    return this.pictures.length >= 1 && this.pictures.length <= 3;
  }

  onSubmit(): void {
    if (this.addForm.valid && this.validatePictures()) {
      const product = this.addForm.value;
      this.productService.createProduct(product, this.pictures, this.vendorId).subscribe((response) => {
        console.log(response);
        this.sharedService.refresh();
        this.modal.close();
      }, (error) => {
        console.error(error);
      });
    } else {
      console.log('Form is invalid');
      this.pictureValidationError = 'Please upload at least 1 picture and no more than 3 pictures';

    }
  }

}
