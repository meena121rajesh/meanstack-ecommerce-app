import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsyncPipe,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() menuToggle = new EventEmitter<void>();
  user$: any;
  cartCount$: any;

  // user$     = this.auth.currentUser$.asObservable();
  // cartCount$ = this.cartService.cartCount$.asObservable();

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.user$ = this.auth.currentUser$.asObservable();
    this.cartCount$ = this.cartService.cartCount$.asObservable();
    
    const user = this.auth.user;
    if (user) this.cartService.getCart(user._id).subscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
