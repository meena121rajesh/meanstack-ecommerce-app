import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState, (s) => s.products
);

export const selectProductTotal = createSelector(
  selectProductState, (s) => s.total        // ✅ new selector
);

export const selectSelectedProduct = createSelector(
  selectProductState, (s) => s.selectedProduct
);

export const selectProductLoading = createSelector(
  selectProductState, (s) => s.loading
);

export const selectProductError = createSelector(
  selectProductState, (s) => s.error
);

export const selectProductFilters = createSelector(
  selectProductState, (s) => s.filters
);

export const selectProductCount = createSelector(
  selectAllProducts, (products) => products.length
);