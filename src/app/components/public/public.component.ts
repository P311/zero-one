import { Component, HostListener, ViewChild } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
})
export class PublicComponent {
  @ViewChild('nav') nav!: MatToolbar;

  prevScrollpos = window.pageYOffset;

  public expandRow = false;

  public isLoggingIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggingIn = this.authService.isLoggingIn();
  }

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

  logout() {
    this.authService.logout();
    this.isLoggingIn = false;
  }
}
