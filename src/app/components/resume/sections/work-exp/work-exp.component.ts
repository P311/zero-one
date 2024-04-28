import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { MONTHS, YEARS } from '../../../../globals';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkExperienceApi } from '../../../../../../api/api';
import { MatDialog } from '@angular/material/dialog';
import { WorkExpWarningModalComponent } from '../work-exp-warning-modal/work-exp-warning-modal.component';

@Component({
  selector: 'app-work-exp',
  templateUrl: './work-exp.component.html',
  styleUrl: './work-exp.component.scss',
})
export class WorkExpComponent implements AfterViewInit {
  constructor(
    public dialog: MatDialog,
    public cdf: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.cdf.detectChanges();
  }

  public currentWork: boolean = false;

  // pageState for work exp page
  // 0: edit general info
  // 1: edit job responsibility
  // 2: show list of work experiences
  public pageState = 0;

  readonly months = MONTHS;

  readonly years = YEARS;

  @Output() indexChange = new EventEmitter<number>();

  public description: string = '';

  currentWorkExp: number = -1;

  form = new FormGroup({
    jobTitle: new FormControl(''),
    company: new FormControl(''),
    country: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    startMonth: new FormControl<number | null>(null),
    startYear: new FormControl<number | null>(null),
    endMonth: new FormControl<number | null>(null),
    endYear: new FormControl<number | null>(null),
  });

  workExps: WorkExperienceApi[] = [];

  back() {
    this.indexChange.emit(0);
  }

  isValid() {
    // both empty or both non-empty
    return (
      (this.form.controls.company.value == '' &&
        this.form.controls.jobTitle.value == '') ||
      (this.form.controls.company.value != '' &&
        this.form.controls.jobTitle.value != '')
    );
  }

  modalData = false;

  addResponsibility() {
    this.form.markAllAsTouched();
    if (!this.isValid()) {
      return;
    }
    const val = this.form.value;
    if (val.jobTitle == '' && val.company == '') {
      const dialogRef = this.dialog.open(WorkExpWarningModalComponent, {
        data: this.modalData,
        autoFocus: false,
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.pageState = 2;
          this.submitForm();
        }
      });
      return;
    }
    this.pageState = 1;
  }

  currentWorkChange() {
    this.currentWork = !this.currentWork;
    if (this.currentWork) {
      this.form.get('endMonth')?.disable();
      this.form.get('endYear')?.disable();
    } else {
      this.form.get('endMonth')?.enable();
      this.form.get('endYear')?.enable();
    }
  }

  backToAddWorkExp() {
    this.pageState = 0;
  }

  addAnotherWorkExp() {
    this.form.reset();
    this.description = '';
    this.backToAddWorkExp();
  }

  finishResponsibility() {
    const val = this.form.value;
    const workExp: WorkExperienceApi = {
      jobTitle: val.jobTitle,
      company: val.company,
      address: {
        city: val.city,
        state: val.state,
        country: val.country,
      },
      startMonth: val.startMonth,
      endMonth: val.endMonth,
      startYear: val.startYear,
      endYear: val.endYear,
      description: this.description,
    };
    console.log(this.workExps);
    if (this.currentWorkExp == -1) {
      this.workExps.push(workExp);
    } else {
      this.workExps[this.currentWorkExp] = workExp;
    }
    this.currentWorkExp = -1;
    this.pageState = 2;
  }

  submitForm() {
    this.indexChange.emit(2);
  }

  editWorkExp(idx: number) {
    const workExp = this.workExps[idx];
    this.currentWorkExp = idx;
    this.form.setValue({
      jobTitle: workExp.jobTitle ? workExp.jobTitle : '',
      company: workExp.company ? workExp.company : '',
      country: workExp.address?.country ? workExp.address?.country : '',
      state: workExp.address?.state ? workExp.address?.state : '',
      city: workExp.address?.city ? workExp.address?.city : '',
      startMonth: workExp.startMonth ? workExp.startMonth : null,
      startYear: workExp.startYear ? workExp.startYear : null,
      endMonth: workExp.endMonth ? workExp.endMonth : null,
      endYear: workExp.endYear ? workExp.endYear : null,
    });
    this.description = workExp.description ? workExp.description : '';
    this.backToAddWorkExp();
  }

  deleteWorkExp(idx: number) {
    this.workExps.splice(idx, 1);
    if (this.workExps.length == 0) {
      this.form.reset();
      this.description = '';
      this.backToAddWorkExp();
    }
  }
}
