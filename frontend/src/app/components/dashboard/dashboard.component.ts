import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe }       from '@angular/common';
import { FormsModule }                   from '@angular/forms';
import { Store }                         from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

import { MatCardModule }              from '@angular/material/card';
import { MatTableModule }             from '@angular/material/table';
import { MatButtonModule }            from '@angular/material/button';
import { MatIconModule }              from '@angular/material/icon';
import { MatFormFieldModule }         from '@angular/material/form-field';
import { MatInputModule }             from '@angular/material/input';
import { MatSelectModule }            from '@angular/material/select';
import { MatTabsModule }              from '@angular/material/tabs';
import { MatProgressSpinnerModule }   from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// NgRx Actions
import * as ProductActions  from '../../store/product/product.actions';

// NgRx Selectors
import {
  selectAllProducts,
  selectProductLoading,
  selectProductCount
} from '../../store/product/product.selectors';

// Category via Service (no NgRx store for categories yet)
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,                  // ✅ REQUIRED
  imports: [
    CommonModule,
    AsyncPipe,
    FormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,               // ✅ Required for snackbar
  ],
  templateUrl: './dashboard.component.html',
  styleUrl:    './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {

  // ✅ NgRx Observables
  products$:     Observable<any[]>;
  loading$:      Observable<boolean>;
  productCount$: Observable<number>;

  // ✅ Local array for table dataSource (populated from store)
  products:   any[] = [];
  categories: any[] = [];

  newProduct  = {
    name: '', price: 0, stock: 0,
    description: '', category: '', image: ''
  };
  newCategory = { name: '' };

  productCols = ['name', 'price', 'stock', 'category', 'action'];
  catCols     = ['name', 'action'];

  private destroy$ = new Subject<void>();

  constructor(
    private store:           Store,
    private categoryService: CategoryService,
    private snackBar:        MatSnackBar
  ) {
    // ✅ SELECT from NgRx store
    this.products$     = this.store.select(selectAllProducts);
    this.loading$      = this.store.select(selectProductLoading);
    this.productCount$ = this.store.select(selectProductCount);
  }

  ngOnInit(): void {
    // ✅ DISPATCH to load products
    this.store.dispatch(
      ProductActions.loadProducts({ filters: {} })
    );

    // ✅ Subscribe for mat-table dataSource (needs array, not Observable)
    this.store.select(selectAllProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe(p => this.products = p);

    // ✅ Load categories via service
    this.categoryService.getCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(c => this.categories = c);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addProduct(): void {
    // ✅ DISPATCH createProduct action
    this.store.dispatch(
      ProductActions.createProduct({ data: this.newProduct })
    );
    this.snackBar.open('Product added!', 'Close', { duration: 2000 });
    this.newProduct = {
      name: '', price: 0, stock: 0,
      description: '', category: '', image: ''
    };
  }

  deleteProduct(id: string): void {
    // ✅ DISPATCH deleteProduct action
    this.store.dispatch(ProductActions.deleteProduct({ id }));
    this.snackBar.open('Product deleted!', 'Close', { duration: 2000 });
  }

  addCategory(): void {
    this.categoryService.createCategory(this.newCategory)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cat) => {
          this.categories = [...this.categories, cat];
          this.snackBar.open('Category added!', 'Close', { duration: 2000 });
          this.newCategory = { name: '' };
        },
        error: () =>
          this.snackBar.open('Error adding category', 'Close', { duration: 2000 })
      });
  }

  deleteCategory(id: string): void {
    this.categoryService.deleteCategory(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.categories = this.categories.filter(c => c._id !== id);
        this.snackBar.open('Category deleted!', 'Close', { duration: 2000 });
      });
  }
}