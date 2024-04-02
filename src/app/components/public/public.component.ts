import { Component, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {
  @ViewChild('nav') nav: any;

  prevScrollpos = window.pageYOffset;

  @HostListener('window:scroll', [])
  onScroll(){
    const currentScrollPos = window.pageYOffset;
    let nav = document.querySelector("#nav");
    if (nav){
      if (this.prevScrollpos > currentScrollPos){
        nav.classList.add("scroll-down");
      } else {
        nav.classList.remove("scroll-down");
      }
    }
    this.prevScrollpos = currentScrollPos;
  }

}
