import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cart',
imports: [
    CommonModule, FormsModule, RouterLink,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCardModule,
    MatDividerModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cart: any;
  address = '';
  paymentMode = 'COD';
  cols = ['product', 'price', 'quantity', 'subtotal', 'action'];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (this.auth.user)
      this.cartService.getCart(this.auth.user._id).subscribe(c => this.cart = c);
  }

  remove(productId: string) {
    this.cartService.removeFromCart(this.auth.user._id, productId).subscribe(c => this.cart = c);
  }

  placeOrder() {
    if (!this.address) {
      this.snackBar.open('Please enter delivery address', 'Close', { duration: 2000 });
      return;
    }
    this.orderService.placeOrder({
      userId: this.auth.user._id,
      address: this.address,
      paymentMode: this.paymentMode
    }).subscribe({
      next: () => {
        this.snackBar.open('Order placed successfully!', 'Close', { duration: 3000 });
        this.cart = null;
      },
      error: e => this.snackBar.open(e.error.message, 'Close', { duration: 2000 })
    });
  }
}
