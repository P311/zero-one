import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from '../../components/public/public.component';

@NgModule({
  declarations: [PublicComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PublicModule {}
