import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { UserService } from '../user-service.service';
import { CartService } from '../cart.service';
import { MatRadioChange } from '@angular/material/radio';
import { PaymentService } from '../payment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  infoForm: FormGroup;
  cart: any;
  paymentGatewayUrl : any;
  payToken: any;
  checking:any;
  error:String | undefined;
  transactionId: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private userService: UserService,
    private cartService: CartService,
    private paymentService: PaymentService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {
    this.infoForm = this.formBuilder.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]+$')]],
      method: ['', [Validators.required]] 
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.cart = (navigation.extras.state as { [key: string]: any })['cart'] || [];
    }
  }

  ngOnInit(): void {
    console.log(this.cart); 
  }

  onSubmit(): void {
    this.checkPayment();
    setTimeout(() => {
      if (this.infoForm.get('method')?.value === 'card' && !this.checking) {
        this.error = "Please complete your card payment or choose paying with cash";
      }
      if(this.infoForm.get('method')?.value==='cash'||this.infoForm.get('method')?.value==='card'&&this.checking){
        if (this.infoForm.valid) {
          const cartArray = this.cart.items;
          const orderProductDTOs = cartArray.map((item: any) => ({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            total: item.price,
            address: this.infoForm.get('address')?.value,
            city: this.infoForm.get('city')?.value,
            country: this.infoForm.get('country')?.value,
            client: this.userService.getUser().id, 
            phoneNumber: this.infoForm.get('phoneNumber')?.value,
            method:this.infoForm.get('method')?.value,
            transactionId:this.transactionId
          }));
          
      
          console.log(orderProductDTOs);
      
          this.orderService.createOrder(orderProductDTOs).subscribe((response: any) => {
            console.log(response);
            this.cartService.deleteCart().subscribe({
              complete: () => {
                this.router.navigate(['/viewOrders',this.userService.getUser().id]);
                setTimeout(() => {
                  window.location.reload();
                }, 50);
              },
              error: (err) => {
                console.error('Error deleting cart:', err);
                // Handle error if needed
              }
            });
          }, (error: any) => {
            console.error(error);
          });
        }
        else{
          this.infoForm.markAllAsTouched();
        }
        
      }
    }, 600); 
   
}
  onOptionChange(event: MatRadioChange): void {
    if (event.value === 'card') {
      this.initiatePayment();
    }
  }
  initiatePayment() {
    const info = {
      amount: this.cart.total+10,
      first_name: this.userService.getUser().username, 
      last_name: this.userService.getUser().username,
      email: this.userService.getUser().email,
      phone: this.infoForm.get('phoneNumber')?.value,
      order_id: this.cart.cartId
    };
  
    this.paymentService.createPayment(info).subscribe((response: any) => {
      console.log(response);
      this.paymentGatewayUrl = this.sanitizer.bypassSecurityTrustResourceUrl(response.data.payment_url);
      this.payToken=response.data.token;
    }, (error: any) => {
      console.error(error);
    });
  }

  checkPayment(){
    this.paymentService.checkPayment(this.payToken).subscribe((response: any) => {
      console.log(response);
      if(response.data.payment_status)
      {
        this.checking=true;
        this.transactionId=response.data.transaction_id;
      }
    }, (error: any) => {
      console.error(error);
    });
  }
  
}