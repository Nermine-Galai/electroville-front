import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'https://sandbox.paymee.tn/api/v2/payments';
  private apiKey = 'e3d132468522b7e6095ec7ea249ce9ee5eb78f79';
  constructor(private http: HttpClient) { }

  createPayment(paymentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.apiKey}`
    });
    const body = {
      amount: paymentData.amount,
      note: "elecville",
      first_name: paymentData.first_name,
      last_name: paymentData.last_name,
      email: paymentData.email,
      phone: paymentData.phone,
      return_url: "https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png",
      webhook_url: "https://www.webhook_url.tn",
      order_id: paymentData.order_id
    };

    return this.http.post(`${this.apiUrl}/create`, body, { headers: headers });
  }
  checkPayment(token: String): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.apiKey}`
    });
    return this.http.get(`${this.apiUrl}/${token}/check`, { headers: headers });

  }
  refundPayment(info:any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.apiKey}`
    });
    const body ={
      transaction_id: info.id,
      amount: info.amount
    }
    return this.http.post(`${this.apiUrl}/refund`,body, { headers: headers });

  }}
  

