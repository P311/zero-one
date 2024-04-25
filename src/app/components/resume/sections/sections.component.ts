import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrl: './sections.component.scss',
})
export class SectionsComponent {
  public selectedIndex = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const template = params['template'];
      if (!template) {
        this.router.navigate(['/resume/template']);
      }
    });
  }

  sectionChange(event: StepperSelectionEvent) {
    this.selectedIndex = event.selectedIndex;
  }

  moveSection(idx: number) {
    this.selectedIndex = idx;
  }
}
