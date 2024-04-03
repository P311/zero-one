import { animate, trigger, transition, style } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms 250ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(250, style({ opacity: 0 }))]),
    ]),
  ],
})
export class ImageSliderComponent {
  @Input() image_paths!: string[];
  currentIndex: number = 0;
  state: boolean = false;
  animationInProgress: boolean = false;

  getCurrentSlideUrl() {
    return this.image_paths[this.currentIndex];
  }

  left() {
    if (!this.animationInProgress) {
      this.currentIndex =
        this.currentIndex == 0
          ? this.image_paths.length - 1
          : this.currentIndex - 1;
      this.state = !this.state;
      this.animationInProgress = true;
      // wait for animation
      setTimeout(() => {
        this.animationInProgress = false;
      }, 500);
    }
  }

  right() {
    if (!this.animationInProgress) {
      this.currentIndex =
        this.currentIndex == this.image_paths.length - 1
          ? 0
          : this.currentIndex + 1;
      this.state = !this.state;
      this.animationInProgress = true;
      // wait for animation
      setTimeout(() => {
        this.animationInProgress = false;
      }, 500);
    }
  }
}
