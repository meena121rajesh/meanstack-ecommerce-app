import { createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';

export interface ProductState {
  products:        any[];
  total:           number;       // ✅ for paginator length
  selectedProduct: any | null;
  loading:         boolean;
  error:           string | null;
  filters:         any;
}

export const initialProductState: ProductState = {
  products:        [],
  total:           0,
  selectedProduct: null,
  loading:         false,
  error:           null,
  filters:         {}
};

export const productReducer = createReducer(
  initialProductState,

  on(ProductActions.loadProducts, (state, { filters }) => ({
    ...state, loading: true, error: null, filters: filters ?? {}
  })),
  on(ProductActions.loadProductsSuccess, (state, { products, total }) => ({
    ...state, loading: false, products, total
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(ProductActions.loadProductById, (state) => ({
    ...state, loading: true, selectedProduct: null
  })),
  on(ProductActions.loadProductByIdSuccess, (state, { product }) => ({
    ...state, loading: false, selectedProduct: product
  })),
  on(ProductActions.loadProductByIdFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(ProductActions.createProduct, (state) => ({
    ...state, loading: true, error: null
  })),
  on(ProductActions.createProductSuccess, (state, { product }) => ({
    ...state, loading: false,
    products: [...state.products, product],
    total: state.total + 1
  })),
  on(ProductActions.createProductFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(ProductActions.deleteProduct, (state) => ({
    ...state, loading: true
  })),
  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state, loading: false,
    products: state.products.filter(p => p._id !== id),
    total: state.total - 1
  })),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state, loading: false, error
  })),

  on(ProductActions.setProductFilters, (state, { filters }) => ({
    ...state, filters
  }))
);