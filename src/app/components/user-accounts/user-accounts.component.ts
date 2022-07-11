import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AdminLayoutService } from 'src/app/layouts/admin-layout/admin-layout.service';
import { SubSink } from 'subsink';
import { DialogUserAccountsComponent } from './dialog-user-accounts/dialog-user-accounts.component';
import { UserAccountsService } from './user-accounts.service';

@Component({
  selector: 'app-user-accounts',
  templateUrl: './user-accounts.component.html',
  styleUrls: ['./user-accounts.component.scss']
})
export class UserAccountsComponent implements OnInit {

  constructor(
    public adminLayoutService: AdminLayoutService,
    private userAccountService: UserAccountsService,
    private dialog: MatDialog
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
  initialUserStatus = new BehaviorSubject<boolean>(true)
  isArchived = new BehaviorSubject<boolean>(false);
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
      }, error => {
        this.textLoader.next("Something went wrong");
      })
    )
  }

  search() {
    this.isArchived.getValue() == true ? this.populateArchivedUserAccounts() : this.populateUserAccounts() 
  }

  onChangePage(pageData: PageEvent) {
    this.page.next(pageData.pageIndex + 1);
    this.limit.next(pageData.pageSize);
    if(this.isArchived.getValue() == true) {
      this.populateArchivedUserAccounts();
    }
    if(this.isArchived.getValue() == false) {
      this.populateUserAccounts();
    }
  }
  
  toggleArchived() {
    this.txtSearch.setValue("")
    this.isArchived.next(!this.isArchived.getValue())
    if(this.isArchived.getValue() == true) {
      this.populateArchivedUserAccounts()
    }
    if(this.isArchived.getValue() == false) {
      this.populateUserAccounts()
    }
  }
  
  populateArchivedUserAccounts() {
    this.dataSource.data = []
    this.userAccountService.getArchivedUserAccounts({ search: this.txtSearch.value, limit: this.limit.getValue(), page: this.page.getValue() }).subscribe({
      next: (response) => {
        this.dataSource.data = response.data;
        this.total.next(response.total)
        response.data.length == 0 && this.textLoader.next("No Data")
      },
      error: (err) => {
        this.textLoader.next("Something went wrong");
      }
    })
  }

  archiveUser(userId: number, status: boolean, user: any) {
    this.dialog.open(DialogUserAccountsComponent, {
      disableClose: true,
      maxWidth: "100vw",
      width: '100%',
      panelClass: 'full-screen-modal',
      backdropClass: "backdropBackground",
      data: {
        userId,
        action: "archiveUser",
        status,
        user,
        question1: "Are you sure you want to",
        question2: status ? "REACTIVATE this DATA" : "ARCHIVE this Data?"
      }
    }).afterClosed().subscribe(response => {
      if(response.isArchived) {
        if(this.isArchived.getValue() == false) {
          this.populateUserAccounts()
        }
        else {
          this.populateArchivedUserAccounts()
        }
      }
    })
  }

  resetPassword(userId:number, user: any) {
    this.dialog.open(DialogUserAccountsComponent, {
      disableClose: true,
      maxWidth: "100vw",
      width: '320px',
      panelClass: 'full-screen-modal',
      backdropClass: "backdropBackground",
      data: {
        userId,
        action: "resetPassword",
        user,
        question1: "Are you sure you want to",
        question2: "RESET PASSWORD of this User?"
      }
    }).afterClosed().subscribe(response => {
      if(response.userId) {
        let index = this.dataSource.data.findIndex(user => user.id == response.userId)
        this.dataSource.data[index].isPasswordReset = true
      }
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
