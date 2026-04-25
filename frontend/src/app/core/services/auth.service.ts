// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { BehaviorSubject, Observable, tap } from 'rxjs';
// import { environment } from '../../../environments/environment';

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private api = `${environment.apiUrl}/auth`;
//   currentUser$ = new BehaviorSubject<any>(null);

//   constructor(private http: HttpClient) {
//     const user = localStorage.getItem('user');
//     if (user) this.currentUser$.next(JSON.parse(user));
//   }

//   register(data: any): Observable<any> {
//     return this.http.post<any>(`${this.api}/register`, data).pipe(
//       tap(res => this.setSession(res))
//     );
//   }

//   login(data: any): Observable<any> {
//     return this.http.post<any>(`${this.api}/login`, data).pipe(
//       tap(res => this.setSession(res))
//     );
//   }

//   private setSession(res: any) {
//     localStorage.setItem('token', res.token);
//     localStorage.setItem('user', JSON.stringify(res.user));
//     this.currentUser$.next(res.user);
//   }

//   logout() {
//     localStorage.clear();
//     this.currentUser$.next(null);
//   }

//   get token() { return localStorage.getItem('token'); }
//   get user()  { return this.currentUser$.value; }
//   get isLoggedIn() { return !!this.token; }
// }

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = `${environment.apiUrl}/auth`;
  private isBrowser: boolean;

  currentUser$ = new BehaviorSubject<any>(null);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const user = localStorage.getItem('user');
      if (user) this.currentUser$.next(JSON.parse(user));
    }
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/register`, data)
      .pipe(tap(res => this.setSession(res)));
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, data)
      .pipe(tap(res => this.setSession(res)));
  }

  private setSession(res: any) {
    if (this.isBrowser) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
    }
    this.currentUser$.next(res.user);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.clear();
    }
    this.currentUser$.next(null);
  }

  get token() {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }

  get user() {
    return this.currentUser$.value;
  }

  get isLoggedIn() {
    return !!this.token;
  }
}