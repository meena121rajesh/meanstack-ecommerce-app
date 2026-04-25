import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-dashboard',
 imports: [
    CommonModule, FormsModule,
    MatCardModule, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTabsModule
  ],  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products:    any[] = [];
  categories:  any[] = [];
  newProduct  = { name: '', price: 0, stock: 0, description: '', category: '', image: '' };
  newCategory = { name: '' };
  productCols = ['name', 'price', 'stock', 'category', 'action'];
  catCols     = ['name', 'action'];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productService.getProducts().subscribe(p => this.products = p);
    this.categoryService.getCategories().subscribe(c => this.categories = c);
  }

  addProduct() {
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.snackBar.open('Product added!', 'Close', { duration: 2000 });
        this.newProduct = { name: '', price: 0, stock: 0, description: '', category: '', image: '' };
        this.loadData();
      }
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => this.loadData());
  }

  addCategory() {
    this.categoryService.createCategory(this.newCategory).subscribe({
      next: () => {
        this.snackBar.open('Category added!', 'Close', { duration: 2000 });
        this.newCategory = { name: '' };
        this.loadData();
      }
    });
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id).subscribe(() => this.loadData());
  }

}
