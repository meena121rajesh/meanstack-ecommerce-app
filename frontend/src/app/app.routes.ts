import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () =>
      import('./components/products/product-list/product-list.component')
        .then(m => m.ProductListComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./components/products/product-detail/product-detail.component')
        .then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'orders',
    loadComponent: () =>
      import('./components/orders/orders.component').then(m => m.OrdersComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register.component').then(m => m.RegisterComponent)
  },
];