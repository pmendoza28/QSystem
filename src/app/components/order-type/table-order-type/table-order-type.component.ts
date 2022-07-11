import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { TTxtLoader } from 'src/app/shared/models/shared.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { DialogOrderTypeComponent } from '../dialog-order-type/dialog-order-type.component';
import { OrderTypeService } from '../order-type.service';

@Component({
  selector: 'app-table-order-type',
  templateUrl: './table-order-type.component.html',
  styleUrls: ['./table-order-type.component.scss']
})
export class TableOrderTypeComponent implements OnInit {

  constructor(
    private orderTypeService: OrderTypeService,
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.populateOrderTypes()
  }

  dataSource = new MatTableDataSource<any>()
  @ViewChild("tblOrderType") tblOrderType: MatTable<any>
  displayedColumns: string[] = [
    "id",
    "order_type_code",
    "description",
    "business_model_code",
    "business_model_name",
    "status",
    "created_at",
    "actions",
  ]
  textLoader = new BehaviorSubject<TTxtLoader>("Loading...")
  limit = new BehaviorSubject(5)
  total = new BehaviorSubject(0)
  pageSizeOptions: number[] = [5, 10, 15, 20, 100];
  page = new BehaviorSubject(1)
  populateOrderTypes() {
    this.orderTypeService.getOrderType({search: this.txtSearch.value, limit: this.limit.getValue(), page: this.page.getValue()}).subscribe({
      next: (response: any) => {
        response.data.length == 0 && this.textLoader.next("No Data")
        this.dataSource.data = response.data
        this.total.next(response.total)
      },
      error: (err) => {
        this.textLoader.next("Something went wrong")
      }
    })
  }

  populateArchivedOrderType() {
    this.orderTypeService.getOrderTypeArchived({search: this.txtSearch.value, limit: this.limit.getValue(), page: this.page.getValue()}).subscribe({
      next: (response) => {
        response.data.length == 0 && this.textLoader.next("No Data")
        this.dataSource.data = response.data
        this.total.next(response.total)
      },
      error: (err) => {
        this.textLoader.next("Something went wrong")
      }
    })
  }

  createOrderType() {
    this.dialog.open(DialogOrderTypeComponent, {
      maxWidth: '100vw',
      width: '350px',
      disableClose: true,
      data: {
        action: "CreateOrderTypeForm"
      }
    }).afterClosed().subscribe(dialogResponse => {
      console.log(`dialogResponse`,dialogResponse)
      if(dialogResponse && dialogResponse.isCreated == true) {
        this.populateOrderTypes()
      }
    })
  }

  toggleArchived() {
  this.isArchived.next(!this.isArchived.getValue())
    this.dataSource.data = []
    this.txtSearch.setValue("")
    if (this.isArchived.getValue() == true) {
      this.populateArchivedOrderType()
    }
    if (this.isArchived.getValue() == false) {
      this.populateOrderTypes()
    }
  }
  txtSearch = new FormControl("")
  isArchived = new BehaviorSubject(false)

  search() {
    if (this.isArchived.getValue() == true) {
      this.dataSource.data = []
      this.textLoader.next("Loading...")
      this.populateArchivedOrderType();
    }
    if (this.isArchived.getValue() == false) {
      this.dataSource.data = []
      this.textLoader.next("Loading...")
      this.populateOrderTypes();
    }
  }

  editOrderType(orderTypeId: number, OrderType: any) {
    this.dialog.open(DialogOrderTypeComponent, {
      maxWidth: '100vw',
      width: '350px',
      disableClose: true,
      data: {
        action: "UpdateOrderTypeForm",
        orderTypeId,
        orderTypeForm: {
          name: OrderType.name,
          code: OrderType.code,
          business_model_code: OrderType.business_model_code,
        }
      }
    }).afterClosed().subscribe(dialogResponse => {
      console.log(`dialogResponse`, dialogResponse)
      if(dialogResponse && dialogResponse.isUpdated == true) {
        let index = this.dataSource.data.findIndex(dt => dt.id == dialogResponse.orderType.id)
        
        this.dataSource.data[index] = {...dialogResponse.orderType, updated: true}
        this.tblOrderType.renderRows()
      }
    })
  }

  archiveBusinessOperation(orderTypeId: number, status: boolean) {
    this.dialog.open(DialogOrderTypeComponent, {
      maxWidth: "100vw",
      width: '100%',
      panelClass: 'full-screen-modal',
      backdropClass: "backdropBackground",
      disableClose: true,
      data: {
        action: "archiveOrderType",
        question1: "Are you sure you want to",
        question2: status ? "RESTORE this DATA" : "ARCHIVE this Data?",
        orderTypeId, 
        status
      }
    }).afterClosed().subscribe(dialogResponse => {
      console.log(dialogResponse)
      if (dialogResponse.isArchived) {
        if (this.isArchived.getValue() == true) {
          this.dataSource.data.splice(this.dataSource.data.findIndex(dt => dt.id == dialogResponse.orderTypeId), 1)
          this.tblOrderType.renderRows() 
          this.total.next(this.total.getValue() - 1)
          this.dataSource.data.length == 0 && this.textLoader.next("No Data")
        }
        if (this.isArchived.getValue() == false) {
          this.dataSource.data.splice(this.dataSource.data.findIndex(dt => dt.id == dialogResponse.orderTypeId), 1)
          this.tblOrderType.renderRows() 
          this.total.next(this.total.getValue() - 1)
          this.dataSource.data.length == 0 && this.textLoader.next("No Data")
        }
      }
    })
  }

  exportToExcel() {
    this.orderTypeService.getOrderTypeForExport().subscribe(response => {
      console.log(response)

      let dataForExcel: any[] = []

      response.forEach((row: any) => {
        dataForExcel.push(Object.values(row))
      })
      let reportData = {
        title: `Order Types`,
        data: dataForExcel,
        headers: ["Id", "Order Type Code", "Description", "Business Model Code", "Business Model Name", "Status", "Date Created"],
        columnColorNumber: 8,
        titleMergeCell: {
          from: 'A1',
          to: 'G2'
        }
      }
      this.utilsService.exportExcel(reportData)
    })
  }

  onChangePage(pageData: PageEvent) {
    this.page.next(pageData.pageIndex + 1);
    this.limit.next(pageData.pageSize);
    this.textLoader.next("Loading...")
    this.dataSource.data = []
    if (this.isArchived.getValue() == true) {
      this.populateArchivedOrderType();
    }
    if (this.isArchived.getValue() == false) {
      this.populateOrderTypes();
    }
  }
}

