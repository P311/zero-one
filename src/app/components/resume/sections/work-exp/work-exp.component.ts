import { Component, EventEmitter, Output } from '@angular/core';
import { MONTHS } from '../../../../globals';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-work-exp',
  templateUrl: './work-exp.component.html',
  styleUrl: './work-exp.component.scss',
})
export class WorkExpComponent {
  public currentWork: boolean = false;

  // state for work exp page
  // 0: edit general info
  // 1: edit job responsibility
  // 2: show list of work experiences
  public state = 0;

  readonly months = MONTHS;

  year = new Date().getFullYear();

  readonly years = Array.from({ length: 90 }, (v, k) => this.year - k);

  @Output() indexChange = new EventEmitter<number>();

  public text: string = '';

  title = new FormControl('');
  company = new FormControl('');

  back() {
    this.indexChange.emit(0);
  }

  addResponsibility() {
    this.state = 1;
  }

  currentWorkChange() {
    this.currentWork = !this.currentWork;
  }

  backToAddWorkExp() {
    this.state = 0;
  }

  finishResponsibility() {
    this.state = 2;
  }

  submitForm() {
    this.indexChange.emit(2);
  }
}
