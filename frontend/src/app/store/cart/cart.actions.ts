import { createAction, props } from '@ngrx/store';

export const loadCart = createAction(
  '[Cart] Load Cart',
  props<{ userId: string }>()
);
export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: any }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ userId: string; productId: string; quantity?: number }>()
);
export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ cart: any }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ userId: string; productId: string }>()
);
export const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ cart: any }>()
);

export const clearCart = createAction(
  '[Cart] Clear Cart',
  props<{ userId: string }>()
);
export const clearCartSuccess = createAction('[Cart] Clear Cart Success');

export const cartFailure = createAction(
  '[Cart] Cart Failure',
  props<{ error: string }>()
);