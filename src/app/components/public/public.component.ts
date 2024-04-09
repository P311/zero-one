import { Component, HostListener, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {
  @ViewChild('nav') nav!: MatToolbar;

  prevScrollpos = window.pageYOffset;

  public expandRow = false;

  @HostListener('window:scroll', [])
  onScroll() {
    const currentScrollPos = window.pageYOffset;
    const nav = document.querySelector('#nav');
    if (nav) {
      if (this.prevScrollpos > currentScrollPos && currentScrollPos > 0) {
        nav.classList.add('scroll-down');
      } else {
        nav.classList.remove('scroll-down');
      }
    }
    this.prevScrollpos = currentScrollPos;
  }
}
