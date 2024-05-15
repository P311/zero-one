import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { authguard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
    // canActivateChild: [authguard],
    // canActivate: [authguard],
  },
  {
    path: 'resume',
    loadChildren: () =>
      import('./modules/resume/resume.module').then((m) => m.ResumeModule),
    // canActivateChild: [authguard],
    // canActivate: [authguard]
  },
];

const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
