import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CloseConfirmationDialogComponent } from './components/close-confirmation-dialog/close-confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    ConfirmationDialogComponent,
    CloseConfirmationDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    CloseConfirmationDialogComponent
  ]
})
export class SharedModule { }
