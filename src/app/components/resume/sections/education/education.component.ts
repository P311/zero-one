import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MONTHS, YEARS } from '../../../../globals';
import { EducationApi } from '../../../../../../api/api';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  @Output() indexChange = new EventEmitter<number>();

  // pageState for education page
  // 0: edit general info
  // 1: show list of education backgrounds
  pageState = 0;

  currentEdu = -1;

  readonly months = MONTHS;

  readonly years = YEARS;

  edus: EducationApi[] = [];

  form = new FormGroup({
    school: new FormControl<string | null>(null),
    degree: new FormControl<string | null>(null),
    field: new FormControl<string | null>(null),
    state: new FormControl<string | null>(null),
    city: new FormControl<string | null>(null),
    graduationMonth: new FormControl<number | null>(null),
    graduationYear: new FormControl<number | null>(null),
    gpa: new FormControl<number | null>(null),
  });

  back() {
    this.indexChange.emit(1);
  }

  submitForm() {
    this.indexChange.emit(3);
  }

  finishEducation() {
    const val = this.form.value;
    if (Object.values(val).every((x) => x === null || x === '')) {
      this.pageState = 1;
      return;
    }
    const edu: EducationApi = {
      school: val.school,
      degree: val.degree,
      field: val.field,
      graduationMonth: val.graduationMonth,
      graduationYear: val.graduationYear,
      gpa: val.gpa,
    };
    if (this.currentEdu == -1) {
      this.edus.push(edu);
    } else {
      this.edus[this.currentEdu] = edu;
    }
    this.currentEdu = -1;
    this.pageState = 1;
  }

  backToEdu() {
    this.pageState = 0;
  }

  addAnotherEdu() {
    this.form.reset();
    this.backToEdu();
  }

  editEdu(idx: number) {
    const edu = this.edus[idx];
    this.currentEdu = idx;
    this.form.setValue({
      school: edu.school ? edu.school : '',
      degree: edu.degree ? edu.degree : '',
      field: edu.field ? edu.field : '',
      graduationMonth: edu.graduationMonth ? edu.graduationMonth : null,
      graduationYear: edu.graduationYear ? edu.graduationYear : null,
      gpa: edu.gpa ? edu.gpa : null,
      city: '',
      state: '',
    });
    this.backToEdu();
  }

  deleteEdu(idx: number) {
    this.edus.splice(idx, 1);
    if (this.edus.length == 0) {
      this.form.reset();
      this.backToEdu();
    }
  }
}
