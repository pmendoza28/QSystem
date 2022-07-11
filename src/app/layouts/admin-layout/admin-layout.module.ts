import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";
import { LayoutModule } from '@angular/cdk/layout';
import { CurrentComponentGuard } from "./current-component.guard";
import { CommonModule } from "@angular/common";
import {DragDropModule} from '@angular/cdk/drag-drop';
const routes: Routes = [
    {
        path: '', component: AdminLayoutComponent,
        children: [
            { path: 'dashboard', canActivate: [CurrentComponentGuard], loadChildren: () => import("../../components/dashboard/dashboard.module").then(m => m.DashboardModule) },
            { path: 'user-accounts', canActivate: [CurrentComponentGuard], loadChildren: () => import("../../components/user-accounts/user-accounts.module").then(m => m.UserAccountsModule) },
            { path: 'business-operations', canActivate: [CurrentComponentGuard], loadChildren: () => import("../../components/business-operation/business-operation.module").then(m => m.BusinessOperationModule) },
            { path: 'business-models', canActivate: [CurrentComponentGuard], loadChildren: () => import("../../components/business-model/business-model.module").then(m => m.BusinessModelModule) },
            { path: 'order-types', canActivate: [CurrentComponentGuard], loadChildren: () => import("../../components/order-type/order-type.module").then(m => m.OrderTypeModule) },
            { path: 'product-details', canActivate: [CurrentComponentGuard], loadChildren: () => import("../../components/product-details/product-details.module").then(m => m.ProductDetailsModule) },
        ]
    }
]

@NgModule({
    declarations: [
        AdminLayoutComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        MatIconModule,
        MatButtonModule,
        LayoutModule,
        CommonModule,
        DragDropModule
    ],
})

export class AdminLayoutModule {

}