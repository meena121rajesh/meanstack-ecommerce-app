import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private api = `${environment.apiUrl}/reviews`;
  constructor(private http: HttpClient) {}

  getReviews(productId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/${productId}`);
  }

  addReview(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/add`, data);
  }
}