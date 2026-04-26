import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(selectAuthState, s => s.user);
export const selectToken = createSelector(selectAuthState, s => s.token);
export const selectLoading = createSelector(selectAuthState, s => s.loading);
export const selectError = createSelector(selectAuthState, s => s.error);
export const selectIsLoggedIn = createSelector(selectToken, token => !!token);