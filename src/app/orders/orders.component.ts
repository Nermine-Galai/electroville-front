import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ViewOrdersComponent } from '../view-orders/view-orders.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  @Input() order: any;
  constructor(private datePipe: DatePipe,private parent : ViewOrdersComponent){}

  get formattedDate(): any {
    return this.datePipe.transform(this.order.date, 'short');
  }
  cancel(id: number): void {
    this.parent.cancel(id);
  }

}
