import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseproductsComponent } from './browseproducts/browseproducts.component';
import { ProductsPerCatComponent } from './products-per-cat/products-per-cat.component';
import { ApproveProductsComponent } from './admin/approve-products/approve-products.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ConsultOrdersComponent } from './admin/consult-orders/consult-orders.component';
import { SigningComponent } from './signing/signing.component';
import { ManageProductsComponent } from './vendor/manage-products/manage-products.component';
import { ManageOrdersComponent } from './vendor/manage-orders/manage-orders.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: '', component: BrowseproductsComponent},
  {path: 'products/:category', component: ProductsPerCatComponent},
  { path: 'products', component: ProductsPerCatComponent },
  { path: '**', redirectTo: 'search', pathMatch: 'full' },
  { path: 'admin/ManageProducts', component: ApproveProductsComponent },
  { path: 'admin/ManageUsers', component: ManageUsersComponent },
  { path: 'admin/ConsultOrders', component: ConsultOrdersComponent },
  { path: 'signin', component: SigningComponent },
  { path: 'vendor/ManageProducts/:userId', component: ManageProductsComponent },
  { path: 'vendor/ManageOrders/:userId', component: ManageOrdersComponent },
  { path: 'viewOrders/:userId', component: ViewOrdersComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
