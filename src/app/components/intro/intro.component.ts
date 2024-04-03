import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  feedbacks: string[] = [
    'assets/feedback/1.jpg',
    'assets/feedback/2.jpg',
    'assets/feedback/3.jpg',
    'assets/feedback/4.jpg',
  ];
}
