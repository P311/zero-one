import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('');

  hide = true;

  errors = ['A valid email is required', 'Password is required', ''];

  readonly EMAIL_IDX = 0;
  readonly PASSWORD_IDX = 1;
  readonly LOGIN_IDX = 2;

  hasError = false;

  isLoading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (this.authService.isLoggingIn()) {
      this.router.navigate(['/resume']);
    }
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateEmailErrorMessage() {
    if (this.email.hasError('required')) {
      this.errors[this.EMAIL_IDX] = 'A valid email is required';
    } else if (this.email.hasError('email')) {
      this.errors[this.EMAIL_IDX] = 'Invalid email';
    } else {
      this.errors[this.EMAIL_IDX] = '';
    }
    this.checkError();
  }

  updatePasswordErrorMessage() {
    if (this.password.hasError('required')) {
      this.errors[this.PASSWORD_IDX] = 'Password is required';
    } else {
      this.errors[this.PASSWORD_IDX] = '';
    }
    this.checkError();
  }

  checkError() {
    // input gets updated, clean request error
    this.errors[this.LOGIN_IDX] = '';
    for (const errorMessage of this.errors) {
      if (errorMessage != '') {
        this.hasError = true;
        return;
      }
    }
    this.hasError = false;
  }

  loginHandler = {
    next: () => {
      this.isLoading = false;
      const urlArray = this.authService.redirectUrl.split('?');
      const path = urlArray[0];
      if (urlArray.length > 1) {
        const paramsBlock = urlArray[1];
        const paramsMap = paramsBlock.split('&').reduce((p, c) => {
          const components = c.split('=');
          p.set(components[0], components[1]);
          return p;
        }, new Map<string, string>());
        const params: { [key: string]: string } = {};
        paramsMap.forEach((value, key) => {
          params[key] = value;
        });

        this.router.navigate([path], { queryParams: params });
      } else {
        this.router.navigate([path]);
      }
    },
    error: () => {
      this.isLoading = false;
      this.errors[this.LOGIN_IDX] =
        'Incorrect email or password. Please try again.';
    },
  };
  submitLogin() {
    if (!this.hasError && this.email.value && this.password.value) {
      this.isLoading = true;
      this.authService
        .login(this.email.value, this.password.value)
        .subscribe(this.loginHandler);
    }
  }
}
