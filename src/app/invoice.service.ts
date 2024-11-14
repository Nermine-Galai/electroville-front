import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8081/api/invoices'; // Base URL for the API

  constructor(private http: HttpClient) {}

  getInvoiceByVendorIdAndOrderId(orderId: number, vendorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}/${vendorId}`);
  }
}
