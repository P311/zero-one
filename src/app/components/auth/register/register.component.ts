import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { UsersService } from '../../../../../api/api';
import { UserApi } from '../../../../../api/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  readonly FIRSTNAME_IDX = 0;
  readonly LASTNAME_IDX = 1;
  readonly EMAIL_IDX = 2;
  readonly PASSWORD_IDX = 3;

  // follow each idx, shows error message
  errors = [
    'Your first name is required',
    'Your last name is required',
    'A valid email is required',
    'Password is required',
  ];

  hide = true;

  hasError = true;

  constructor(private userService: UsersService) {
    merge(this.firstName.statusChanges, this.firstName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateFirstNameErrorMessage());

    merge(this.lastName.statusChanges, this.lastName.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateLastNameErrorMessage());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailErrorMessage());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }

  updateFirstNameErrorMessage() {
    if (this.firstName.hasError('required')) {
      this.errors[this.FIRSTNAME_IDX] = 'Your first name is required';
    } else {
      this.errors[this.FIRSTNAME_IDX] = '';
    }
    this.checkError();
  }

  updateLastNameErrorMessage() {
    if (this.lastName.hasError('required')) {
      this.errors[this.LASTNAME_IDX] = 'Your last name is required';
    } else {
      this.errors[this.LASTNAME_IDX] = '';
    }
    this.checkError();
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

  submitRegister() {
    if (!this.hasError && this.email.value && this.password.value) {
      const reqBody: UserApi = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
      };
      this.userService.usersPost(reqBody).subscribe(
        (res) => {
          console.log('users created' + res);
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }
}
