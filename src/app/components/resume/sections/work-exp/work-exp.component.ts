import { Component, EventEmitter, Output } from '@angular/core';
import { MONTHS } from '../../../../globals';

@Component({
  selector: 'app-work-exp',
  templateUrl: './work-exp.component.html',
  styleUrl: './work-exp.component.scss',
})
export class WorkExpComponent {
  public currentWork: boolean = false;

  public addWorkExp: boolean = true;

  readonly months = MONTHS;
  @Output() indexChange = new EventEmitter<number>();

  back() {
    this.indexChange.emit(0);
  }
  submitForm() {
    // this.indexChange.emit(2);
    this.addWorkExp = false;
  }

  currentWorkChange() {
    this.currentWork = !this.currentWork;
  }
}
