import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-product-list',
imports: [
    CommonModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatSliderModule,
    MatProgressSpinnerModule, MatCardModule,
    ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  products:   any[] = [];
  categories: any[] = [];
  loading = false;
  filters = { search: '', category: '', sort: '', minPrice: null, maxPrice: null };

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      if (p['category']) this.filters.category = p['category'];
      this.loadProducts();
    });
    this.categoryService.getCategories().subscribe(c => this.categories = c);
  }

  loadProducts() {
    this.loading = true;
    this.productService.getProducts(this.filters).subscribe({
      next: p => { this.products = p; this.loading = false; },
      error: () => this.loading = false
    });
  }

  onAddToCart(product: any) {
    // handled inside product-card
  }
}
