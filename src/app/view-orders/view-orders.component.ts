import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] | undefined;
  clientId: number | undefined;
  orderProducts:any;

  constructor(private route: ActivatedRoute, private orderService: OrderService,private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clientId = +params.get('userId')!;
      this.loadorders(this.clientId);
    });
  }

  loadorders(clientId: any): void {
    this.orderService.getOrdersByClientId(clientId).subscribe(orders => {
      this.orders = orders;
      console.log(orders)
    });
  }

  cancel(orderId: any): void {
    this.orderService.getOrderById(orderId).subscribe(
      response => {
        console.log(response); 
        this.orderProducts=response;
        for(let product of this.orderProducts.products)
        {
          if(product.status==='pending'&&product.method==='card'){
            const info={
              id:product.transactionId,
              amount:product.total
            }
            this.paymentService.refundPayment(info).subscribe(
              response => {
                console.log(response); 
              },
              error => {
                console.error(error);
              }
            );
          }
        }
      },
      error => {
        console.error(error);
      }
    );
    this.orderService.cancelPendingProducts(orderId).subscribe(
      response => {
        console.log(response); 
        this.loadorders(this.clientId); // Refresh the order list
      },
      error => {
        console.error(error);
      }
    );
  }
}
