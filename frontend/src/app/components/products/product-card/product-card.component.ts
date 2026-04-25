import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
   @Input() product: any;
  @Output() addToCart = new EventEmitter<any>();

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  addToCartFn(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }
    this.cartService.addToCart(this.auth.user._id, this.product._id).subscribe({
      next: () => this.snackBar.open('Added to cart!', 'Close', { duration: 2000 }),
      error: () => this.snackBar.open('Error adding to cart', 'Close', { duration: 2000 })
    });
  }
}
