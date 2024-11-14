import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowseproductsComponent } from './browseproducts/browseproducts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import { AdCarouselComponent } from './ad-carousel/ad-carousel.component';
import { NewProductsComponent } from './new-products/new-products.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsPerCatComponent } from './products-per-cat/products-per-cat.component';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApproveProductsComponent } from './admin/approve-products/approve-products.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ConsultOrdersComponent } from './admin/consult-orders/consult-orders.component';
import { RequestsModalComponent } from './admin/requests-modal/requests-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageModalComponent } from './admin/image-modal/image-modal.component';
import { DatePipe } from '@angular/common';
import { SigningComponent } from './signing/signing.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ManageProductsComponent } from './vendor/manage-products/manage-products.component';
import { ManageOrdersComponent } from './vendor/manage-orders/manage-orders.component';
import { ProductCardsComponent } from './vendor/product-card/product-card.component';
import { AddProductComponent } from './vendor/add-product/add-product.component';
import { InvoiceComponent } from './vendor/invoice/invoice.component';
import { EditProductComponent } from './vendor/edit-product/edit-product.component';
import { MatSelectModule } from '@angular/material/select';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    BrowseproductsComponent,
    NavbarComponent,
    AdCarouselComponent,
    NewProductsComponent,
    ProductCardComponent,
    ProductsPerCatComponent,
    ApproveProductsComponent,
    ManageUsersComponent,
    ConsultOrdersComponent,
    RequestsModalComponent,
    ImageModalComponent,
    SigningComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    ProductCardsComponent,
    AddProductComponent,
    InvoiceComponent,
    EditProductComponent,
    ViewProductComponent,
    ViewOrdersComponent,
    CartComponent,
    CheckoutComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBadgeModule, MatButtonModule, MatIconModule,MatCheckboxModule,MatFormFieldModule,MatInputModule,MatSelectModule,MatRadioModule,
    HttpClientModule,
    FormsModule,ReactiveFormsModule,
    NgbModule,
  ],
  providers: [
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
