import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-work-exp-warning-modal',
  templateUrl: './work-exp-warning-modal.component.html',
  styleUrl: './work-exp-warning-modal.component.scss',
})
export class WorkExpWarningModalComponent {
  constructor(
    public dialogRef: MatDialogRef<WorkExpWarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boolean,
  ) {}

  submitForm() {
    this.data = true;
    this.dialogRef.close();
  }
}
