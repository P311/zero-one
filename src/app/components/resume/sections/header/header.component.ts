import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderApi } from '../../../../../../api/api';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  header?: HeaderApi;

  form = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    zipCode: new FormControl(''),
  });

  @Output() indexChange = new EventEmitter<number>();

  isValid() {
    return this.form.controls.email.valid;
  }

  submitForm() {
    this.form.markAllAsTouched();
    if (!this.isValid()) {
      return;
    }
    const val = this.form.value;
    this.header = {
      name: val.name,
      email: val.email,
      phoneNumber: val.phoneNumber,
      address: {
        city: val.city,
        state: val.state,
        country: val.country,
        zipCode: val.zipCode,
      },
    };
    this.indexChange.emit(1);
  }
}
