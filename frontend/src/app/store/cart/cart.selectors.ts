import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectCartState,
  (state) => state.cart
);

export const selectCartItems = createSelector(
  selectCart,
  (cart) => cart?.items || []
);

export const selectCartTotal = createSelector(
  selectCart,
  (cart) => cart?.totalPrice || 0
);

export const selectCartItemCount = createSelector(
  selectCartItems,
  (items) => items.length
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state) => state.loading
);