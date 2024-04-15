import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { IdentityService } from '../../../../../api/api';
import { TokenRequestApi } from '../../../../../api/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('');

  hide = true;

  errors = ['A valid email is required', 'Password is required'];

  readonly EMAIL_IDX = 0;
  readonly PASSWORD_IDX = 1;

  hasError = true;

  constructor(private identityService: IdentityService) {
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
      if (errorMessage != '') {
        this.hasError = true;
        return;
      }
    }
    this.hasError = false;
  }

  submitLogin() {
    if (!this.hasError && this.email.value && this.password.value) {
      const token: TokenRequestApi = {
        email: this.email.value,
        password: this.password.value,
      };
      this.identityService.identityTokenPost(token).subscribe(
        (res) => {
          console.log('users login' + res);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }
}
