import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(filters?: any): Observable<any[]> {
    let params = new HttpParams();
    if (filters?.category)  params = params.set('category', filters.category);
    if (filters?.minPrice)  params = params.set('minPrice', filters.minPrice);
    if (filters?.maxPrice)  params = params.set('maxPrice', filters.maxPrice);
    if (filters?.search)    params = params.set('search', filters.search);
    if (filters?.sort)      params = params.set('sort', filters.sort);
    return this.http.get<any[]>(this.api, { params });
  }

  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post<any>(this.api, data);
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}