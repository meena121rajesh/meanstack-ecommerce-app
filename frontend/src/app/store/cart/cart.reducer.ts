import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';

export interface CartState {
  cart:    any | null;
  loading: boolean;
  error:   string | null;
}

export const initialCartState: CartState = {
  cart:    null,
  loading: false,
  error:   null
};

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.loadCart, CartActions.addToCart,
     CartActions.removeFromCart, (state) => ({
    ...state, loading: true
  })),

  on(CartActions.loadCartSuccess,
     CartActions.addToCartSuccess,
     CartActions.removeFromCartSuccess, (state, { cart }) => ({
    ...state, loading: false, cart
  })),

  on(CartActions.clearCartSuccess, (state) => ({
    ...state, loading: false, cart: null
  })),

  on(CartActions.cartFailure, (state, { error }) => ({
    ...state, loading: false, error
  }))
);