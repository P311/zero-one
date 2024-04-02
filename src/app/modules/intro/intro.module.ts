import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from '../../components/intro/intro.component';
import { IntroRoutingModule } from './intro-routing.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [IntroComponent],
  imports: [CommonModule, IntroRoutingModule,
      MatButtonModule],
})
export class IntroModule {}
