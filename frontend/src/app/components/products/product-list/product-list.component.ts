import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe }       from '@angular/common';
import { FormsModule }                   from '@angular/forms';
import { ActivatedRoute }                from '@angular/router';
import { Store }                         from '@ngrx/store';
import { Observable, Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule }       from '@angular/material/form-field';
import { MatInputModule }           from '@angular/material/input';
import { MatSelectModule }          from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule }            from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSliderModule }          from '@angular/material/slider';
import { MatIconModule }            from '@angular/material/icon';
import { MatButtonModule }          from '@angular/material/button';
import { MatChipsModule }           from '@angular/material/chips';

import { ProductCardComponent } from '../product-card/product-card.component';

import * as ProductActions from '../../../store/product/product.actions';
import * as CartActions    from '../../../store/cart/cart.actions';

import {
  selectAllProducts,
  selectProductLoading,
  selectProductTotal
} from '../../../store/product/product.selectors';

import { selectCurrentUser } from '../../../store/auth/auth.selectors';
import { CategoryService }   from '../../../core/services/category.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    ProductCardComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl:    './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {

  // ── NgRx Observables ──────────────────────────────────────────
  products$: Observable<any[]>;
  loading$:  Observable<boolean>;
  total$:    Observable<number>;

  // ── Pagination ────────────────────────────────────────────────
  pageIndex = 0;
  pageSize  = 10;
  pageSizeOptions = [4, 8, 12, 24];

  // ── Filters ───────────────────────────────────────────────────
  filters = {
    search:    '',
    category:  '',
    sort:      '',
    minPrice:  null as number | null,
    maxPrice:  null as number | null,
    minRating: null as number | null,
  };

  // ── Category list for dropdown ────────────────────────────────
  categories: any[] = [];

  // ── Rating options ────────────────────────────────────────────
  readonly ratingOptions = [
    { label: 'All Ratings',  value: null },
    { label: '⭐ 1+',        value: 1    },
    { label: '⭐⭐ 2+',      value: 2    },
    { label: '⭐⭐⭐ 3+',    value: 3    },
    { label: '⭐⭐⭐⭐ 4+',  value: 4    },
  ];

  // ── Sort options ──────────────────────────────────────────────
  readonly sortOptions = [
    { label: 'Default',           value: ''          },
    { label: 'Price: Low → High', value: 'price_asc' },
    { label: 'Price: High → Low', value: 'price_desc'},
    { label: 'Top Rated',         value: 'rating'    },
    { label: 'Newest First',      value: 'newest'    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private store:           Store,
    private route:           ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$  = this.store.select(selectProductLoading);
    this.total$    = this.store.select(selectProductTotal);
  }

  ngOnInit(): void {
    // Load categories for dropdown
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(cats => this.categories = cats);

    // React to query params (e.g. sidebar category click)
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(p => {
        if (p['category']) {
          this.filters.category = p['category'];
          this.pageIndex = 0;
        }
        this.dispatchLoad();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // ── Dispatch load with current filters + pagination ───────────
  dispatchLoad(): void {
    this.store.dispatch(ProductActions.loadProducts({
      filters: {
        ...this.filters,
        page: this.pageIndex,
        size: this.pageSize,
      }
    }));
  }

  // ── Called on any filter change ───────────────────────────────
  applyFilters(): void {
    this.pageIndex = 0;   // Reset to page 1 on filter change
    this.dispatchLoad();
  }

  // ── Reset all filters ─────────────────────────────────────────
  resetFilters(): void {
    this.filters = {
      search: '', category: '', sort: '',
      minPrice: null, maxPrice: null, minRating: null
    };
    this.pageIndex = 0;
    this.dispatchLoad();
  }

  // ── Paginator event ───────────────────────────────────────────
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize  = event.pageSize;
    this.dispatchLoad();
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── Add to cart ───────────────────────────────────────────────
  onAddToCart(product: any): void {
    this.store.select(selectCurrentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        if (user) {
          this.store.dispatch(CartActions.addToCart({
            userId:    user._id,
            productId: product._id,
            quantity:  1
          }));
        }
      })
      // Immediately unsubscribe after first value
      ;
  }

  // ── Helper: check if any filter is active ────────────────────
  get hasActiveFilters(): boolean {
    return !!(
      this.filters.search ||
      this.filters.category ||
      this.filters.sort ||
      this.filters.minPrice ||
      this.filters.maxPrice ||
      this.filters.minRating
    );
  }
}