import { Component, HostListener } from '@angular/core';

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

  screenSize: number;
  constructor() {
    this.screenSize = 0;
    this.checkMobile();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobile();
  }

  checkMobile() {
    if (screen.width <= 425) {
      this.screenSize = 0;
    } else if (screen.width <= 768) {
      this.screenSize = 1;
    } else if (screen.width <= 1024) {
      this.screenSize = 2;
    } else {
      this.screenSize = 3;
    }
  }
}
