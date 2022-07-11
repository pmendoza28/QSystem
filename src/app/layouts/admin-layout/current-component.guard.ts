import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminLayoutService } from './admin-layout.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentComponentGuard implements CanActivate {
  constructor(
    private adminLayoutService: AdminLayoutService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      route.routeConfig?.path == "dashboard" && (this.adminLayoutService.currentComponent = "Main Dashboard");
      route.routeConfig?.path == "user-accounts" && (this.adminLayoutService.currentComponent = "Masterlist");
      route.routeConfig?.path == "business-operations" && (this.adminLayoutService.currentComponent = "Masterlist");
      route.routeConfig?.path == "business-models" && (this.adminLayoutService.currentComponent = "Masterlist");
      route.routeConfig?.path == "order-types" && (this.adminLayoutService.currentComponent = "Masterlist");

    return true;
  }
  
}
