import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../core/services/cart.service';
import * as CartActions from './cart.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class CartEffects {

  // ✅ inject()
  private actions$    = inject(Actions);
  private cartService = inject(CartService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(({ userId }) =>
        this.cartService.getCart(userId).pipe(
          map(cart => CartActions.loadCartSuccess({ cart })),
          catchError(e =>
            of(CartActions.cartFailure({ error: e?.message || 'Error' }))
          )
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      mergeMap(({ userId, productId, quantity }) =>
        this.cartService.addToCart(userId, productId, quantity ?? 1).pipe(
          map(cart => CartActions.addToCartSuccess({ cart })),
          catchError(e =>
            of(CartActions.cartFailure({ error: e?.message || 'Error' }))
          )
        )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      mergeMap(({ userId, productId }) =>
        this.cartService.removeFromCart(userId, productId).pipe(
          map(cart => CartActions.removeFromCartSuccess({ cart })),
          catchError(e =>
            of(CartActions.cartFailure({ error: e?.message || 'Error' }))
          )
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      mergeMap(({ userId }) =>
        this.cartService.clearCart(userId).pipe(
          map(() => CartActions.clearCartSuccess()),
          catchError(e =>
            of(CartActions.cartFailure({ error: e?.message || 'Error' }))
          )
        )
      )
    )
  );
}