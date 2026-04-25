import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CartService {
  private api = `${environment.apiUrl}/cart`;
  cartCount$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  getCart(userId: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${userId}`).pipe(
      tap(cart => this.cartCount$.next(cart?.items?.length || 0))
    );
  }

  addToCart(userId: string, productId: string, quantity = 1): Observable<any> {
    return this.http.post<any>(`${this.api}/add`, { userId, productId, quantity }).pipe(
      tap(cart => this.cartCount$.next(cart?.items?.length || 0))
    );
  }

  removeFromCart(userId: string, productId: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/remove/${userId}/${productId}`).pipe(
      tap(cart => this.cartCount$.next(cart?.items?.length || 0))
    );
  }

  clearCart(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/clear/${userId}`).pipe(
      tap(() => this.cartCount$.next(0))
    );
  }
}