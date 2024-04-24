import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../../components/resume/template/template.component';
import { SectionsComponent } from '../../components/resume/sections/sections.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'template',
  },
  {
    path: 'template',
    component: TemplateComponent,
  },
  {
    path: 'sections',
    component: SectionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeRoutingModule {}
