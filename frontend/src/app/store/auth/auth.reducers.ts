import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, { user, token }) => ({
    ...state,
    loading: false,
    user,
    token
  })),

  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    token: null
  })),

  on(AuthActions.loadUserFromStorageSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token
  }))
);