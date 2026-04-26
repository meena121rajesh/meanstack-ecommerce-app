import { createAction, props } from '@ngrx/store';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<{
    filters?: {
      search?:    string;
      category?:  string;
      sort?:      string;
      minPrice?:  number | null;
      maxPrice?:  number | null;
      minRating?: number | null;
      page?:      number;
      size?:      number;
    }
  }>()
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: any[]; total: number }>()  // ✅ total count for paginator
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

export const loadProductById = createAction(
  '[Product] Load Product By Id',
  props<{ id: string }>()
);
export const loadProductByIdSuccess = createAction(
  '[Product] Load Product By Id Success',
  props<{ product: any }>()
);
export const loadProductByIdFailure = createAction(
  '[Product] Load Product By Id Failure',
  props<{ error: string }>()
);

export const createProduct = createAction(
  '[Product] Create Product',
  props<{ data: any }>()
);
export const createProductSuccess = createAction(
  '[Product] Create Product Success',
  props<{ product: any }>()
);
export const createProductFailure = createAction(
  '[Product] Create Product Error',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: string }>()
);
export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<{ id: string }>()
);
export const deleteProductFailure = createAction(
  '[Product] Error Handler',
  props<{ error: any }>()
);

export const setProductFilters = createAction(
  '[Product] Set Filters',
  props<{ filters: any }>()
);