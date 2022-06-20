import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";
import { LayoutModule } from '@angular/cdk/layout';
import { CurrentComponentGuard } from "./current-component.guard";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "src/app/interceptors/auth.interceptor.service";
import { Title } from "@angular/platform-browser";
const routes: Routes = [
    {
        path: '', component: AdminLayoutComponent,
        children: [
            { path: 'dashboard', canActivate: [CurrentComponentGuard], loadChildren: () => import("../../components/dashboard/dashboard.module").then(m => m.DashboardModule) },
            { path: 'user-accounts', canActivate: [CurrentComponentGuard], loadChildren: () => import("../../components/user-accounts/user-accounts.module").then(m => m.UserAccountsModule) },
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
        CommonModule
    ],
    // providers: [
    //     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //     Title
    // ]
})

export class AdminLayoutModule {

}