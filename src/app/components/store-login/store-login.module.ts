import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreLoginComponent } from './store-login.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StoreLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class StoreLoginModule { }
