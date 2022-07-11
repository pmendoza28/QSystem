import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableProductDetailsComponent } from './table-product-details/table-product-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: TableProductDetailsComponent }
]

@NgModule({
  declarations: [
    TableProductDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductDetailsModule { }
