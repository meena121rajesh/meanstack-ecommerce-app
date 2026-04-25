import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = `${environment.apiUrl}/orders`;
  constructor(private http: HttpClient) {}

  placeOrder(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/place`, data);
  }

  getUserOrders(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/user/${userId}`);
  }

  updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put<any>(`${this.api}/${orderId}/status`, { status });
  }
}