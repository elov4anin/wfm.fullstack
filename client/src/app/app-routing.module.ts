import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthLayoutsComponent} from './layouts/auth-layouts/auth-layouts.component';
import {SiteLayoutsComponent} from './layouts/site-layouts/site-layouts.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {AuthGuard} from './shared/classes/auth.guard';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {AnalyticsPageComponent} from './pages/analytics-page/analytics-page.component';
import {HistoryPageComponent} from './pages/history-page/history-page.component';
import {OrderPageComponent} from './pages/order-page/order-page.component';
import {CategoriesPageComponent} from './pages/categories-page/categories-page.component';
import {CategoriesFormPageComponent} from './pages/categories-form-page/categories-form-page.component';
import {OrderCategoriesComponent} from './pages/order-page/order-categories/order-categories.component';
import {OrderPositionsComponent} from './pages/order-page/order-positions/order-positions.component';

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
    {path: '', component: SiteLayoutsComponent, canActivate: [AuthGuard], children: [
        {path: 'overview', component: OverviewPageComponent},
        {path: 'analytics', component: AnalyticsPageComponent},
        {path: 'history', component: HistoryPageComponent},
        {path: 'order', component: OrderPageComponent, children: [
            {path: '', component: OrderCategoriesComponent},
            {path: ':id', component: OrderPositionsComponent}
          ]
        },
        {path: 'categories', component: CategoriesPageComponent},
        {path: 'categories/new', component: CategoriesFormPageComponent},
        {path: 'categories/:id', component: CategoriesFormPageComponent},
      ]}

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
