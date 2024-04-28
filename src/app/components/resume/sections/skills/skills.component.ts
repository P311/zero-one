import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  @Output() indexChange = new EventEmitter<number>();

  skillForms: FormControl[] = [];

  ngOnInit() {
    for (let i = 0; i < 4; i++) {
      const control = new FormControl('');
      this.skillForms.push(control);
    }
  }

  addSkill() {
    this.skillForms.push(new FormControl(''));
  }

  deleteSkill(idx: number) {
    this.skillForms.splice(idx, 1);
  }

  back() {
    this.indexChange.emit(2);
  }

  finishSkills() {
    this.indexChange.emit(4);
  }
}
