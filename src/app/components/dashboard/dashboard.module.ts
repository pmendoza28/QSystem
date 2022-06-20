import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { BranchesComponent } from './branches/branches.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NgChartsModule } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
const routes: Routes = [
  { path: '', component: DashboardComponent}
]

@NgModule({
  declarations: [
    DashboardComponent,
    OverviewComponent,
    BranchesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    NgChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
    
  ]
})
export class DashboardModule { }
