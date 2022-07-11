import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableBusinessOperationComponent } from './table-business-operation/table-business-operation.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DialogBusinessOperationComponent } from './dialog-business-operation/dialog-business-operation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
const routes: Routes = [
  { path: '', component: TableBusinessOperationComponent }
]

@NgModule({
  declarations: [
    TableBusinessOperationComponent,
    DialogBusinessOperationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    DirectivesModule,
    MatDividerModule,
    MatTooltipModule,
    MatRippleModule,
    MatRadioModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class BusinessOperationModule { }
