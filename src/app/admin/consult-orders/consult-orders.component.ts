import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consult-orders',
  templateUrl: './consult-orders.component.html',
  styleUrl: './consult-orders.component.css'
})
export class ConsultOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders()
      .subscribe(
        (orders: any[]) => {
          this.orders = orders.map(order => ({
            ...order,
            date: this.datePipe.transform(order.date, 'short')
            
          }));
        },
        (error) => {
          console.error('Error fetching orders:', error);
        }
      );
  }
  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return '#f0ad48'; 
      case 'completed':
        return '#4CAF50'; // Green color
      case 'cancelled':
        return '#FF0000'; // Red color
      case 'in progress':
        return '#1E90FF'; // Blue color for 'in progress'
      default:
        return '#000000'; // Default color or handle other cases as needed
    }
  }
  

}
