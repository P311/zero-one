import { Injectable } from '@angular/core';
import moment from 'moment';
import {
  IdentityService,
  RefreshAccessTokenApi,
  SuccessTokenResponseApi,
  TokenRequestApi,
} from '../../../api/api';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private identityService: IdentityService, private router: Router) {}

  public redirectUrl = '/resume';

  public isLoggingIn() {
    console.log(navigator.cookieEnabled);
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment().isBefore(expiresAt);
    }
    return false;
  }

  public login(email: string, password: string) {
    const token: TokenRequestApi = {
      email: email,
      password: password,
    };
    return this.identityService.identityTokenPost(token).pipe(
      map((res: SuccessTokenResponseApi) => {
        if (!navigator.cookieEnabled){
          localStorage.setItem('access_token', res.access_token ?? '');
          localStorage.setItem('refresh_token', res.refresh_token ?? '');
          const expiresAt = moment().add(res.expires_in, 'second');
          localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
        }
        return res;
      }),
      catchError((err) => {
        return err;
      }),
    );
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public refresh() {
    if (navigator.cookieEnabled){
      return this.identityService.identityRefreshGet();
    } else {
      const refreshToken = localStorage.getItem('refresh_token');
      if(!refreshToken){
        this.router.navigate(['/auth/login']);
        return EMPTY;
      } else {
        const refreshTokenApi: RefreshAccessTokenApi = {
          refreshToken: localStorage.getItem('refresh_token'),
        } 
        return this.identityService.identityRefreshPost(refreshTokenApi);
      }
    }
  }
}
