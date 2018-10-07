import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {AuthLayoutsComponent} from './layouts/auth-layouts/auth-layouts.component';
import {SiteLayoutsComponent} from './layouts/site-layouts/site-layouts.component';
import {RegisterPageComponent} from './pages/register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './shared/classes/token.interceptor';
import {OverviewPageComponent} from './pages/overview-page/overview-page.component';
import {AnalyticsPageComponent} from './pages/analytics-page/analytics-page.component';
import {HistoryPageComponent} from './pages/history-page/history-page.component';
import {OrderPageComponent} from './pages/order-page/order-page.component';
import {CategoriesPageComponent} from './pages/categories-page/categories-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormPageComponent } from './pages/categories-form-page/categories-form-page.component';
import { PositionsFormComponent } from './pages/categories-form-page/positions-form/positions-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutsComponent,
    SiteLayoutsComponent,
    RegisterPageComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormPageComponent,
    PositionsFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
