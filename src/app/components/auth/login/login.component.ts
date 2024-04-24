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

  hasError = true;

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
    for (const errorMessage of this.errors) {
      this.errors[this.LOGIN_IDX] = '';
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
      this.router.navigate([this.authService.redirectUrl]);
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
