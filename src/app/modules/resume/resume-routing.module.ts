import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../../components/resume/template/template.component';
import { ResumeMenuComponent } from '../../components/resume/resume-menu/resume-menu.component';

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
    path: 'section',
    component: ResumeMenuComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'template',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeRoutingModule {}
