import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResumeRoutingModule } from './resume-routing.module';
import { SectionsComponent } from '../../components/resume/sections/sections.component';
import { TemplateComponent } from '../../components/resume/template/template.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HeaderComponent } from '../../components/resume/sections/header/header.component';
import { ResumeNavComponent } from '../../components/resume/resume-nav/resume-nav.component';
import { WorkExpComponent } from '../../components/resume/sections/work-exp/work-exp.component';
import { EditorModule } from 'primeng/editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TemplateComponent,
    SectionsComponent,
    HeaderComponent,
    ResumeNavComponent,
    WorkExpComponent,
  ],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatStepperModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ResumeModule {}
