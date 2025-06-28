import { provideRouter } from '@angular/router';
import { AuthComponent } from './auth/auth';

export const appConfig = {
  providers: [
    provideRouter([
      { path: '', component: AuthComponent }
    ])
  ]
};
