import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthLayoutsComponent} from './layouts/auth-layouts/auth-layouts.component';
import {SiteLayoutsComponent} from './layouts/site-layouts/site-layouts.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {AuthGuard} from './shared/classes/auth.guard';

const appRoutes: Routes = [
  {
    path: '', component: AuthLayoutsComponent, children: [
        {
          path: '', redirectTo: '/login',  pathMatch: 'full'
        },
        {
          path: 'login', component: LoginPageComponent
        },
        {
          path: 'register', component: RegisterPageComponent
        }
      ]
    },
    {path: '', component: SiteLayoutsComponent, canActivate: [AuthGuard], children: []}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
