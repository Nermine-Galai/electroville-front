import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { ProductService } from '../../product-service.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../modal.service';
import { PaymentService } from '../../payment.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.css'
})
export class ManageOrdersComponent implements OnInit {
  orders: any;
  vendorId: number =0;
  product:any;

  constructor(private orderService: OrderService,private datePipe: DatePipe,private productService: ProductService,private modalService: ModalService,
    private route: ActivatedRoute,private paymentService:PaymentService) { }

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.vendorId = +params.get('userId')!;
        this.getProductsOrders(this.vendorId);
        
        
      });
    
  }
  getProductsOrders(vendorId: number) {
    this.orderService.getProductsOrders(vendorId).subscribe(
      (data: any[]) => {
        this.orders = data;
        for(let order of this.orders){
          if(order.status==='pending'){
            this.productService.getProductById(order.productId).subscribe(
              response => {
                console.log(response[0]);
                this.product=response[0];
              },
              error => {
                console.error(error);
              }
            );
            setTimeout(() => {
              
            if(this.product.inventory<order.quantity){
              this.updateOrderStatus(order,"cancelled");
            }
          }, 500); 
      
        }

        
      }
      console.log(this.orders)
      },
      
      error => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  updateOrderStatus(order:any, status: string): void {
    if(order.method==='card'&&status==='cancelled'){
      
      const info={
        id:order.transactionId,
        amount:order.total
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
     
    
    this.orderService.updateOrderStatus(order.productId, order.orderId, status,this.vendorId).subscribe(
      () => {
        console.log('Order status updated successfully');
        this.getProductsOrders(this.vendorId)
      },
      error => {
        console.error('Error updating order status:', error);
        // Handle error (e.g., show an error message)
      }
    );
  }

  
  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return '#f0ad48'; // Amber color
      case 'completed':
        return '#4CAF50'; // Green color
      case 'cancelled':
        return '#FF0000'; // Red color
      case 'in progress':
        return '#007BFF'; // Blue color
      default:
        return '#000000'; 
    }
}
openModal(order :any) {
  this.modalService.showinvoice(order,this.vendorId);
  console.log(this.orders)
}


}
