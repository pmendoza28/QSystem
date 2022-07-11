import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { AdminLayoutService } from 'src/app/layouts/admin-layout/admin-layout.service';
import { TTxtLoader } from 'src/app/shared/models/shared.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SubSink } from 'subsink';
import { BusinessOperationService } from '../business-operation.service';
import { DialogBusinessOperationComponent } from '../dialog-business-operation/dialog-business-operation.component';

@Component({
  selector: 'app-table-business-operation',
  templateUrl: './table-business-operation.component.html',
  styleUrls: ['./table-business-operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableBusinessOperationComponent implements OnInit {

  constructor(
    public adminLayoutService: AdminLayoutService,
    private businessOperationService: BusinessOperationService,
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) { }

  subs = new SubSink()
  ngOnInit(): void {
    this.populateBusinessOperations()
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
  populateBusinessOperations() {
    this.textLoader.next("Loading...");
    this.subs.add(
      this.businessOperationService.getBusinessOperation(this.txtSearch.value, this.limit.getValue(), this.page.getValue()).subscribe(response => {
        console.log(response)
        const { data, total } = response;
        total == 0 && this.textLoader.next("No Data");
        this.dataSource.data = data
        this.total.next(total)
      }, err => {
        this.textLoader.next("Something went wrong");
      })
    )
  }
  populateArchivedBusinessOperation() {
    this.subs.add(
      this.businessOperationService.getArchivedBusinessOperations({ search: this.txtSearch.value, limit: this.limit.getValue(), page: this.page.getValue() }).subscribe({
        next: (response) => {
          this.dataSource.data = response.data;
          this.total.next(response.total)
          response.data.length == 0 && this.textLoader.next("No Data")
        },
        error: (err) => {
          this.textLoader.next("Something went wrong");
        }
      })
    )
  }
  dataSource = new MatTableDataSource<any>()
  displayedColumns: string[] = [
    "code",
    "desc",
    "status",
    "created_at",
    "actions",
  ]
  pageSizeOptions: number[] = [5, 10, 15, 20, 100];
  limit = new BehaviorSubject<number>(5)
  page = new BehaviorSubject<number>(1);
  total = new Subject<number>();
  textLoader = new BehaviorSubject<TTxtLoader>("Loading...")
  txtSearch: FormControl = new FormControl("")

  isArchived = new BehaviorSubject(false)
  toggleArchived() {
    // this.isArchived.next(!this.isArchived.getValue())
    this.txtSearch.setValue("")
    this.isArchived.next(!this.isArchived.getValue())
    if (this.isArchived.getValue() == true) {
      this.populateArchivedBusinessOperation()
    }
    if (this.isArchived.getValue() == false) {
      this.populateBusinessOperations()
    }
  }

  archiveBusinessOperation(businessOperation: { id: number; code: string; name: string }, status: boolean) {
    this.dialog.open(DialogBusinessOperationComponent, {
      disableClose: true,
      maxWidth: "100vw",
      width: '100%',
      panelClass: 'full-screen-modal',
      backdropClass: "backdropBackground",
      data: {
        question: status ? "Are you sure you want to activate this business operation?" : "Are you sure you want to archive this business operation?",
        action: "archiveBusinessOperation",
        businessOperation,
        status,
        buttonName: status ? "YES" : "YES",
        question2: status ? "REACTIVATE this DATA" : "ARCHIVE this Data?"
      }
    }).afterClosed().subscribe(dialogResponse => {
      if (dialogResponse.isArchived) {
        if (this.isArchived.getValue() == true) {
          this.populateArchivedBusinessOperation();
        }
        if (this.isArchived.getValue() == false) {
          this.populateBusinessOperations();
        }
      }
    })
  }

  onChangePage(pageData: PageEvent) {
    this.page.next(pageData.pageIndex + 1);
    this.limit.next(pageData.pageSize);
    // this.populateBusinessOperations();
    if (this.isArchived.getValue() == true) {
      this.populateArchivedBusinessOperation();
    }
    if (this.isArchived.getValue() == false) {
      this.populateBusinessOperations();
    }
  }

  search() {
    if (this.isArchived.getValue() == true) {
      this.populateArchivedBusinessOperation();
    }
    if (this.isArchived.getValue() == false) {
      this.populateBusinessOperations();
    }
  }

  createBusinessOperation() {
    this.dialog.open(DialogBusinessOperationComponent, {
      disableClose: true,
      maxWidth: '100vw',
      width: '350px',
      data: {
        action: "createBusinessOperation"
      }
    }).afterClosed().subscribe(dialogResponse => {
      if (dialogResponse != undefined && dialogResponse.created == true) {
        this.populateBusinessOperations()
      }
    })
  }

  @ViewChild("tblBusinessOperation") tblBusinessOperation: MatTable<any>
  gettingTheBusinessOperation$ = new BehaviorSubject(false)
  editBusinessOperation(businessOperationId: number) {
    this.gettingTheBusinessOperation$.next(true)
    this.businessOperationService.getBusinessOperationByID(businessOperationId).subscribe({
      next: (response) => {
        this.gettingTheBusinessOperation$.next(false)
        this.dialog.open(DialogBusinessOperationComponent, {
          disableClose: true,
          maxWidth: '100vw',
          width: '350px',
          data: {
            action: "editBusinessOperation",
            id: response.id,
            code: response.code,
            name: response.name,
          }
        }).afterClosed().subscribe(dialogResponse => {
          if (dialogResponse.isUpdated && dialogResponse.data) {
            let index = this.dataSource.data.findIndex(dt => dt.id == dialogResponse.data.id)
            this.dataSource.data[index] = dialogResponse.data
            this.tblBusinessOperation.renderRows()
          }
        })
      },
      error: (err) => {
        this.gettingTheBusinessOperation$.next(false)
      }
    })

  }

  exportToExcel() {
    this.dialog.open(DialogBusinessOperationComponent, {
      disableClose: true,
      data: {
        action: "exportToExcel"
      }
    })
  }
}


