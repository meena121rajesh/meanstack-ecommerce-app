import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  // constructor(private actions$: Actions) {}
    private actions$    = inject(Actions);
  private authService = inject(AuthService);
  private router      = inject(Router);

  // Save to localStorage
  saveUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(({ user, token }) => {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
           this.router.navigate(["/products"])
        })
      ),
    { dispatch: false }
  );

  // Load from localStorage
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUserFromStorage),
      map(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        return AuthActions.loadUserFromStorageSuccess({
          user: user ? JSON.parse(user) : null,
          token: token || null
        });
      })
    )
  );

  // Clear storage on logout
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        })
      ),
    { dispatch: false }
  );
}
