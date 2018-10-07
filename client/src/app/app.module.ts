import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthLayoutsComponent } from './layouts/auth-layouts/auth-layouts.component';
import { SiteLayoutsComponent } from './layouts/site-layouts/site-layouts.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './shared/services/auth.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './shared/classes/token.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutsComponent,
    SiteLayoutsComponent,
    RegisterPageComponent
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
export class AppModule { }
