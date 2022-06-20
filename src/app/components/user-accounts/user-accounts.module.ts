import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountsComponent } from './user-accounts.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { CreateUserAccountsComponent } from './create-user-accounts/create-user-accounts.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogUserAccountsComponent } from './dialog-user-accounts/dialog-user-accounts.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditUserAccountsComponent } from './edit-user-accounts/edit-user-accounts.component';

const routes: Routes = [
  { path: '', component: UserAccountsComponent },
  { path: 'create', component: CreateUserAccountsComponent },
  { path: 'edit', component: EditUserAccountsComponent },
]

@NgModule({
  declarations: [
    UserAccountsComponent,
    CreateUserAccountsComponent,
    DialogUserAccountsComponent,
    EditUserAccountsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    SharedModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatMenuModule,
    DirectivesModule,
    MatSnackBarModule
  ]
})
export class UserAccountsModule { }