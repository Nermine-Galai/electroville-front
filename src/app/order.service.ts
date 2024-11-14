import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:8081/api/orders';

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProductsOrders(vendorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${vendorId}/products`);
  }
  getOrdersByClientId(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${clientId}/orders`);
  }
  getOrderById(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${orderId}`);
  }

  updateOrderStatus(productId: number, orderId: number, status: string, vendorId: number): Observable<void> {
    
    const currentDateTime = new Date().toISOString();
    
    // Create HttpParams and add parameters including the date and time
    const params = new HttpParams()
        .set('status', status)
        .set('vendorId', vendorId)
        .set('dateStr', currentDateTime);
    
    // Perform the HTTP PUT request
    return this.http.put<void>(`${this.apiUrl}/${orderId}/products/${productId}/status`, {}, { params });
}
cancelPendingProducts(orderId: number): Observable<string> {
  return this.http.put(`${this.apiUrl}/${orderId}/cancel`, null, { responseType: 'text' });
}

createOrder(orderData: any): Observable<any> {
  const currentDateTime = new Date().toISOString();
  const params = new HttpParams()
       .set('dateStr', currentDateTime);
  return this.http.post(`${this.apiUrl}/create`, orderData,{ params });
}

}
