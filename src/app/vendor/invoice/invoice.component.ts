import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../invoice.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {
  invoice: any| undefined;
  constructor(public modal: NgbActiveModal,private invoiceService: InvoiceService,private datePipe: DatePipe,private router: Router){}
  
  @Input() order: any;
  @Input() vendorId: any;


  ngOnInit(): void {
    this.loadInvoice();
    console.log(this.order)
    
  }
  loadInvoice(): void {
    this.invoiceService.getInvoiceByVendorIdAndOrderId(this.order.orderId, this.vendorId)
   .subscribe({
      next: (invoice: any) => {
        this.invoice = {
         ...invoice,
          date: this.datePipe.transform(invoice.date, 'short')
        };
        console.log(this.invoice)
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
      }
    });
  }

  printInvoice() {
    const printArea = document.getElementById('print-area');
    if (printArea) {
      const windowContent = window.document.body.innerHTML;
      window.document.body.innerHTML = printArea.innerHTML;
      window.print();
      window.document.body.innerHTML = windowContent;
    } else {
      console.error("Element with ID 'print-area' not found");
    }
    setTimeout(function() {
      location.reload();
 }, 100);
    
  }
  

 
  

}
