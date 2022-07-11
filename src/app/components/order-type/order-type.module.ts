import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableOrderTypeComponent } from './table-order-type/table-order-type.component';
import { DialogOrderTypeComponent } from './dialog-order-type/dialog-order-type.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

const routes: Routes = [
  { path: "", component: TableOrderTypeComponent }
]

@NgModule({
  declarations: [
    TableOrderTypeComponent,
    DialogOrderTypeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    DirectivesModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
  ]
})
export class OrderTypeModule { }
