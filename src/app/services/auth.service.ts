import { Injectable } from '@angular/core';
import moment from 'moment';
import {
  IdentityService,
  SuccessTokenResponseApi,
  TokenRequestApi,
} from '../../../api/api';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private identityService: IdentityService) {}

  public redirectUrl = '/resume';

  public isLoggingIn() {
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
    console.log(email, password);
    return this.identityService.identityTokenPost(token).pipe(
      map((res: SuccessTokenResponseApi) => {
        localStorage.setItem('token', res.access_token ?? '');
        console.log(res.access_token);
        const expiresAt = moment().add(res.expires_in, 'second');
        console.log(this.redirectUrl);
        console.log(JSON.stringify(expiresAt.valueOf()));
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
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
}
