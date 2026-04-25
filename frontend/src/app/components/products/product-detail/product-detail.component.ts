import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { ReviewService } from '../../../core/services/review.service';
import { OrderService } from '../../../core/services/order.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-product-detail',
imports: [
    CommonModule, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatDividerModule, MatFormFieldModule, MatInputModule,
    MatProgressSpinnerModule
  ],  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product: any;
  reviews: any[] = [];
  loading = false;
  newReview = { rating: 5, comment: '' };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private reviewService: ReviewService,
    private orderService: OrderService,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  get isLoggedIn() { return this.auth.isLoggedIn; }

  ngOnInit() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductById(id).subscribe(p => {
      this.product = p; this.loading = false;
    });
    this.reviewService.getReviews(id).subscribe(r => this.reviews = r);
  }

  getStars(n = this.product?.ratings || 0) {
    return Array(Math.round(n)).fill(0);
  }

  addToCart() {
    if (!this.auth.isLoggedIn) return;
    this.cartService.addToCart(this.auth.user._id, this.product._id).subscribe({
      next: () => this.snackBar.open('Added to cart!', 'Close', { duration: 2000 })
    });
  }

  buyNow() {
    if (!this.auth.isLoggedIn) return;
    const order = {
      userId:      this.auth.user._id,
      address:     'Default Address',
      paymentMode: 'COD'
    };
    // Add to cart first then place order
    this.cartService.addToCart(this.auth.user._id, this.product._id).subscribe(() => {
      this.orderService.placeOrder(order).subscribe({
        next: () => this.snackBar.open('Order placed!', 'Close', { duration: 2000 })
      });
    });
  }

  submitReview() {
    if (!this.auth.isLoggedIn) return;
    this.reviewService.addReview({
      productId: this.product._id,
      userId:    this.auth.user._id,
      ...this.newReview
    }).subscribe({
      next: r => {
        this.reviews.unshift(r);
        this.newReview = { rating: 5, comment: '' };
        this.snackBar.open('Review added!', 'Close', { duration: 2000 });
      },
      error: e => this.snackBar.open(e.error.message || 'Error', 'Close', { duration: 2000 })
    });
  }
}
