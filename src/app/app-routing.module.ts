import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { StoreLoginComponent } from './components/store-login/store-login.component';
import { AnimationTutorialComponent } from './sandbox/animation-tutorial/animation-tutorial.component';
import { CustomTableComponent } from './sandbox/custom-table/custom-table.component';
import { DimensionalComponent } from './sandbox/dimensional/dimensional.component';
import { GridComponent } from './sandbox/grid/grid.component';
import { RxjsTipsComponent } from './sandbox/rxjs-tips/rxjs-tips.component';
import { RxjsComponent } from './sandbox/rxjs/rxjs.component';
import { StreamComponent } from './sandbox/stream/stream.component';
import { TableAnimationComponent } from './sandbox/table-animation/table-animation.component';

const routes: Routes = [
  { path: '', component: StoreLoginComponent },
  { path: 'administrator/authentication', component: AdminLoginComponent },
  { path: 'admin', loadChildren: () => import("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule) },
  { path: 'sandbox/grid', component: GridComponent },
  { path: 'sandbox/stream', component: StreamComponent },
  { path: 'sandbox/rxjs', component: RxjsComponent },
  { path: 'sandbox/rxjs-tips', component: RxjsTipsComponent },
  { path: 'sandbox/dimensional', component: DimensionalComponent },
  { path: 'sandbox/animation', component: AnimationTutorialComponent },
  { path: 'sandbox/table-animation', component: TableAnimationComponent },
  { path: 'sandbox/custom-table', component: CustomTableComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
