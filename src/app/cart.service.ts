import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { SessionService } from './session.service';
import { UserService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = 'http://localhost:8081/api/cart';
  
  private cartItemsCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  cartItemsCount$: Observable<number> = this.cartItemsCountSubject.asObservable();

  constructor(private http: HttpClient, private sessionService: SessionService, private userService: UserService) {
    this.initCart();
  }

  initCart(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const initialItemCount = cartItems.length;
      this.cartItemsCountSubject.next(initialItemCount);
    }
  }

  addToCart(cartItem: any, clientId?: number): Observable<any> {
    let params = new HttpParams();
    const sessionId = this.sessionService.getSessionId();
    if (clientId) {
      params = params.set('clientId', clientId);
    }
    if (sessionId) {
      params = params.set('sessionId', sessionId);
    }

    const existingCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartItems = [...existingCartItems, cartItem];

    localStorage.setItem('cart', JSON.stringify(cartItems));

    this.cartItemsCountSubject.next(cartItems.length);

    return this.http.post(`${this.apiUrl}/add`, cartItem, { params, responseType: 'text' });
  }

  viewCart(clientId?: number): Observable<any> {
    let params = new HttpParams();
    const sessionId = this.sessionService.getSessionId();
    if (sessionId) {
      params = params.set('sessionId', sessionId);
    }
    if (clientId) {
      params = params.set('clientId', clientId);
    }

    return this.http.get<any>(`${this.apiUrl}/view`, { params });
  }

  removeFromCart(cartItemId: number,productId:Number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/item/${cartItemId}`, { responseType: 'text' }).pipe(
      tap(() => {
        // Retrieve existing cart items from local storage
        const existingCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        
        
        // Create a new array excluding the item with the specified ID
        const updatedCartItems = existingCartItems.filter((item: any) => item.productId !== productId);
        
        
        // Save the updated cart items back to local storage
        localStorage.setItem('cart', JSON.stringify(updatedCartItems));
        
        // Update the BehaviorSubject with the new item count
        this.cartItemsCountSubject.next(updatedCartItems.length);
      }),
      catchError((error: any) => {
        console.error('Error removing cart item:', error);
        throw error;
      })
    );
  }
  updateCart(cartId: number, productId: number, quantity: number): Observable<any> {
    let params = new HttpParams()
        .set('cartId', cartId)
        .set('productId', productId)
        .set('quantity', quantity);

    const existingCartItems = JSON.parse(localStorage.getItem('cart') || '[]');

    if (quantity < 0) {
        // Remove one instance of the item if quantity is negative
        const itemIndex = existingCartItems.findIndex((item: any) => item.productId === productId);
        if (itemIndex !== -1) {
            existingCartItems.splice(itemIndex, 1);
            localStorage.setItem('cart', JSON.stringify(existingCartItems));
            this.cartItemsCountSubject.next(existingCartItems.length);
        } else {
            console.log('Item with the specified ID not found.');
        }
    } else {
        // Add a new instance of the same item
        const existingItem = existingCartItems.find((item: any) => item.productId === productId);

        if (existingItem) {
            const newItem = { ...existingItem };
            existingCartItems.push(newItem);
            localStorage.setItem('cart', JSON.stringify(existingCartItems));
            this.cartItemsCountSubject.next(existingCartItems.length);
        } else {
            console.log('Item with the specified ID not found.');
        }
    }

    return this.http.put(`${this.apiUrl}/update`, null, { params, responseType: 'text' });
}


  deleteCart(): Observable<void> {
    const sessionId = this.sessionService.getSessionId();
    localStorage.removeItem('cart');
    return this.http.delete<void>(`${this.apiUrl}/${sessionId}`,);
  }
  
  
}
