import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBusinessModelComponent } from './table-business-model/table-business-model.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { DialogBusinessModelComponent } from './dialog-business-model/dialog-business-model.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from "ngx-mat-select-search";
import { MatTooltipModule } from '@angular/material/tooltip';

const routes: Routes = [
  { path: '', component: TableBusinessModelComponent },
]

@NgModule({
  declarations: [
    TableBusinessModelComponent,
    DialogBusinessModelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMenuModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatTooltipModule,
  ]
})
export class BusinessModelModule { }
