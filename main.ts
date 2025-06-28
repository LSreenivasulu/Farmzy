// src/main.ts
import 'zone.js'; // ✅ Required for Angular apps to work

import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { AppComponent } from './app/app';
import { AuthComponent } from './app/auth/auth';
import { DashboardComponent } from './app/dashboard/dashboard';
import { ProductDetailComponent } from './app/product-detail/product-detail';
import { UserProfileComponent } from './app/user-profile/user-profile';
import { AdminDashboardComponent } from './app/admin-dashboard';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', component: AuthComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product/:id', component: ProductDetailComponent },

      // ✅ User profile route used by routerLink="/profile"
      { path: 'profile', component: UserProfileComponent },

      // ✅ Lazy-loaded admin login
      {
        path: 'admin-login',
        loadComponent: () =>
          import('./app/admin/admin-login/admin-login').then(m => m.AdminLoginComponent)
      },

      // ✅ Eager-loaded admin dashboard
      { path: 'admin-dashboard', component: AdminDashboardComponent },

      {
        path: 'order-address',
        loadComponent: () =>
          import('./app/order-address/order-address').then(m => m.OrderAddressComponent)
      },
      {
        path: 'confirm-order',
        loadComponent: () =>
          import('./app/confirm-order/confirm-order').then(m => m.ConfirmOrderComponent)
      }
    ])
  ]
});
