import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { TemplateComponent } from '../../components/resume/template/template.component';
import { ResumeMenuComponent } from '../../components/resume/resume-menu/resume-menu.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [TemplateComponent, ResumeMenuComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatStepperModule,
    MatToolbarModule,
  ],
})
export class ResumeModule {}
