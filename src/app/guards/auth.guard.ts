import { inject } from '@angular/core';
import {
  Router,
  CanActivateChildFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authguard: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggingIn()) {
    return true;
  } else {
    // Redirect the user to the login page or any other route
    authService.redirectUrl = state.url;
    router.navigate(['/auth/login']);
    return false;
  }
};
