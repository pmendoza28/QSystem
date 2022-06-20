import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AdminLayoutService } from 'src/app/layouts/admin-layout/admin-layout.service';
import { SubSink } from 'subsink';
import { UserAccountsService } from './user-accounts.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss']
})
export class UserAccountsComponent implements OnInit {

  constructor(
    public adminLayoutService: AdminLayoutService,
    private userAccountService: UserAccountsService
  ) { }
  subs = new SubSink();
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [
    "id",
    "first_name",
    "last_name",
    "user_role",
    "username",
    "status",
    "date_created",
    "actions",
  ];

  displayedList: any[] = [
    { icon: "face", label: "ID", value: "1001" },
    { icon: "person", label: "First Name", value: "Philip Joshua" },
    { icon: "person", label: "Last Name", value: "Mendoza" },
    { icon: "accessibility", label: "User Role", value: "Admin" },
    { icon: "account_circle", label: "Username", value: "pmendoza" },
    { icon: "info", label: "Status", value: "Active" },
    { icon: "event", label: "Date Created", value: "Yesterday" },
    { icon: "settings", label: "Actions", value: "" },
  ];
  txtSearch: UntypedFormControl = new UntypedFormControl("");
  pageSizeOptions = [5, 10, 15, 20, 100];
  limit = new BehaviorSubject<number>(5)
  page = new BehaviorSubject<number>(1);
  total = new Subject<number>();
  textLoader = new BehaviorSubject<"No Data" | "Loading..." | "Something went wrong">("Loading...")

  ngOnInit(): void {
    this.populateUserAccounts()
  }

  populateUserAccounts() {
    this.textLoader.next("Loading...");
    this.dataSource.data = [];
    this.subs.add(
      this.userAccountService.getUserAccounts({ search: this.txtSearch.value, limit: this.limit.getValue(), page: this.page.getValue() }).subscribe(response => {
        this.dataSource.data = response.data
        this.total.next(response.total)
        response.data.length == 0 && this.textLoader.next("No Data")
      }, error =>{
        this.textLoader.next("Something went wrong");
      })
    )
  }

  onChangePage(pageData: PageEvent) {
    this.page.next(pageData.pageIndex + 1);
    this.limit.next(pageData.pageSize);
    this.populateUserAccounts();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
