import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginModule } from './components/admin-login/admin-login.module';
import { StoreLoginModule } from './components/store-login/store-login.module';
import { SandboxModule } from './sandbox/sandbox.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminLoginModule,
    StoreLoginModule,
    SandboxModule,
    

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
