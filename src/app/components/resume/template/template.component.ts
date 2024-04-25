import { Component } from '@angular/core';
import { TEMPLATES } from '../../../globals';

export interface template {
  id: number;
  path: string;
}

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {
  templates = TEMPLATES;

  selected: null | template = null;

  selectTemplate(template: template) {
    this.selected = template;
    console.log(this.selected);
  }
}
