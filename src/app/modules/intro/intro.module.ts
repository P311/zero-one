import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from '../../components/intro/intro.component';
import { IntroRoutingModule } from './intro-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [IntroComponent],
  imports: [
    CommonModule,
    IntroRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
  ],
})
export class IntroModule {}
