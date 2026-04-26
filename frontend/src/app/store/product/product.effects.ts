import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../core/services/product.service';
import * as ProductActions from './product.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class ProductEffects {

  private actions$       = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(({ filters }) =>
        this.productService.getProducts(filters).pipe(
          // ✅ Backend { products, total } return karega
          map(res => ProductActions.loadProductsSuccess({
            products: res.products ?? res,
            total:    res.total    ?? res.length ?? 0
          })),
          catchError(error =>
            of(ProductActions.loadProductsFailure({
              error: error?.message || 'Unknown error'
            }))
          )
        )
      )
    )
  );

  loadProductById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadProductById),
      switchMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map(product =>
            ProductActions.loadProductByIdSuccess({ product })
          ),
          catchError(error =>
            of(ProductActions.loadProductByIdFailure({
              error: error?.message || 'Error'
            }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.createProduct),
      mergeMap(({ data }) =>
        this.productService.createProduct(data).pipe(
          map(product => ProductActions.createProductSuccess({ product })),
          catchError(error =>
            of(ProductActions.createProductFailure({
              error: error?.message || 'Error'
            }))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map(() => ProductActions.deleteProductSuccess({ id })),
          catchError(error =>
            of(ProductActions.deleteProductFailure({
              error: error?.message || 'Error'
            }))
          )
        )
      )
    )
  );
}