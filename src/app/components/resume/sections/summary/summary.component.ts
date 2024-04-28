import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  @Output() indexChange = new EventEmitter<number>();

  public summary = '';

  back() {
    this.indexChange.emit(3);
  }

  submitForm() {
    this.indexChange.emit(5);
  }
}
