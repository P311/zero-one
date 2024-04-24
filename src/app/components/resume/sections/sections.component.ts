import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
})
export class SectionsComponent {
  public selectedIndex = 0;

  sectionChange(event: StepperSelectionEvent) {
    this.selectedIndex = event.selectedIndex;
  }

  moveSection(idx: number) {
    this.selectedIndex = idx;
  }
}
