import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminLayoutService } from './admin-layout.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})

export class AdminLayoutComponent implements OnInit {

  constructor(
    public adminLayoutService: AdminLayoutService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }


  isSmallScreen: any = this.breakpointObserver.isMatched('(max-width: 599px)');

  isNotificationOpen: boolean = false;
  isProfileDropdownOpen: boolean = false;
  isMasterlistOpen: boolean = false;

  masterlists: any[] = [
    { icon: "person", label: "User Accounts" },
    { icon: "business", label: "Business Operations" },
    { icon: "business_center", label: "Business Model" },
    { icon: "list_alt", label: "Order Types" },
    { icon: "inventory_2", label: "Product Details" },
    { icon: "credit_card", label: "Type of Payment" },
    { icon: "payments", label: "Mode of Payment" },
  ]

  toggleMasterlist() {
    this.isMasterlistOpen = !this.isMasterlistOpen;
  }

  toggleProfileDropdown() {
    this.isNotificationOpen = false;
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen
  }

  toggleNotification() {
    this.isProfileDropdownOpen = false
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  ngOnInit(): void {
    this.sidebarAction()
    this.detechMobileView()
  }

  sidebarAction() {
    if (localStorage.getItem("isSidebarOpen") == null) {
      localStorage.setItem("isSidebarOpen", "opened")
      this.adminLayoutService.isSidebarOpen = true;
    }

    if (localStorage.getItem("isSidebarOpen") == "opened") {
      this.adminLayoutService.isSidebarOpen = true;
    }

    if (localStorage.getItem("isSidebarOpen") == "closed") {
      this.adminLayoutService.isSidebarOpen = false;
    }
  }

  detechMobileView() {
    this.breakpointObserver.observe(['(max-width: 641px)']).subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.adminLayoutService.view = "mobile"
        this.adminLayoutService.isSidebarOpen = false;
        localStorage.setItem("isSidebarOpen", "closed")
      }
      else {
        this.adminLayoutService.view = null
        this.adminLayoutService.isSidebarOpen = true;
        localStorage.setItem("isSidebarOpen", "opened")
      }
    })
  }

  toggle() {
    this.adminLayoutService.isSidebarOpen = !this.adminLayoutService.isSidebarOpen
    if (this.adminLayoutService.isSidebarOpen) localStorage.setItem("isSidebarOpen", "opened")
    if (!this.adminLayoutService.isSidebarOpen) localStorage.setItem("isSidebarOpen", "closed")
  }

  logout() {
    this.router.navigate(["/administrator/authentication"])
  }

  navigateTo(to: string) {
    this.router.navigate([`/admin/${to}`])
    if (this.adminLayoutService.view == "mobile") this.adminLayoutService.isSidebarOpen = !this.adminLayoutService.isSidebarOpen
  }
}
