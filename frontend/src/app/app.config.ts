import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Reducers
import { productReducer } from './store/product/product.reducer';
import { cartReducer }    from './store/cart/cart.reducer';
import { authReducer }    from './store/auth/auth.reducers';

// Effects
import { ProductEffects } from './store/product/product.effects';
import { CartEffects }    from './store/cart/cart.effects';
import { AuthEffects }    from './store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
    provideAnimations(),

    provideStore({
      products: productReducer,
      cart: cartReducer,
      auth: authReducer
    }),

    // NgRx Effects
    provideEffects([ProductEffects, CartEffects, AuthEffects]),

    // DevTools (only in dev)
    provideStoreDevtools({ maxAge: 25, logOnly: false })
  ]
};
 

