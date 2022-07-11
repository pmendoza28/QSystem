import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Subject } from 'rxjs';
import { AdminLayoutService } from 'src/app/layouts/admin-layout/admin-layout.service';
import { blub, fadeOut } from 'src/app/shared/animation/template.animation';
import { TTxtLoader } from 'src/app/shared/models/shared.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SubSink } from 'subsink';
import { BusinessModelService } from '../business-model.service';
import { DialogBusinessModelComponent } from '../dialog-business-model/dialog-business-model.component';

@Component({
  selector: 'app-table-business-model',
  templateUrl: './table-business-model.component.html',
  styleUrls: ['./table-business-model.component.scss'],
  animations: [fadeOut, blub],
})
export class TableBusinessModelComponent implements OnInit {

  constructor(
    public adminLayoutService: AdminLayoutService,
    private businessModelService: BusinessModelService,
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) { }

  subs = new SubSink()

  ngOnInit(): void {
    this.populateBusinessModels()
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  populateBusinessModels() {
    this.subs.add(
      this.businessModelService.getBusinessModel({search: this.txtSearch.value, limit: this.limit.getValue(), page: this.page.getValue()}).subscribe({
        next: (response) => {
          console.log(response)
          response.total == 0 && this.textLoader.next("No Data");
          this.dataSource.data = response.data;
          this.total.next(response.total)
        },
        error: (err) => {
          this.textLoader.next("Something went wrong");
        }
      })
    )
  }

  populateArchivedBusinessModel() {
    this.subs.add(
      this.businessModelService.getArchivedBusinessModel({search: this.txtSearch.value, limit: this.limit.getValue(), page: this.page.getValue()}).subscribe({
        next: (response) => {
          response.total == 0 && this.textLoader.next("No Data");
          this.dataSource.data = response.data;
          this.total.next(response.total)
        },
        error: (err) => {
          this.textLoader.next("Something went wrong");
        }
      })
    )
  }

  createBusinessModel() {
    this.dialog.open(DialogBusinessModelComponent, {
      disableClose: true,
      maxWidth: '100vw',
      width: '350px',
      data: {
        action: "businessModelForm"
      }
    }).afterClosed().subscribe(dialogResponse => {
      if(dialogResponse.isCreated == true) {
        this.populateBusinessModels()
      }
    })
  }

  toggleArchived() {
    this.isArchived.next(!this.isArchived.getValue())
    this.dataSource.data = []
    this.txtSearch.setValue("")
    if (this.isArchived.getValue() == true) {
      this.populateArchivedBusinessModel()
    }
    if (this.isArchived.getValue() == false) {
      this.populateBusinessModels()
    }
  }

  txtSearch = new FormControl("");
  dataSource = new MatTableDataSource<any>()
  isArchived = new BehaviorSubject(false)
  displayedColumns: string[] = [
    "business_operation_code",
    "business_operation_description",
    "business_model_code",
    "business_model_name",
    "status",
    "created_at",
    "actions",
  ]
  textLoader = new BehaviorSubject<TTxtLoader>("Loading...")
  pageSizeOptions: any = [5, 10, 15, 20, 100]
  limit = new BehaviorSubject<number>(5)
  page = new BehaviorSubject<number>(1);
  total = new BehaviorSubject<number>(0);
  @ViewChild("tblBusinessModel") tblBusinessModel: MatTable<any>

  editBusinessOperation(businessModelId: number) {
    this.businessModelService.getBusinessModelById(businessModelId).subscribe(response => {
      this.dialog.open(DialogBusinessModelComponent, {
        disableClose: true,
        data: {
          action: "editBusinessModelForm",
          businessModelId,
          businessModelForm: {
            business_operation_code: response.business_operation_code,
            name: response.name
          }
        }
      }).afterClosed().subscribe(dialogResponse => {
        console.log(dialogResponse)
        let index = this.dataSource.data.findIndex(dt => dt.id == dialogResponse.businessModelId)
        this.dataSource.data[index] = { ...dialogResponse.updatedData, updated: true }
        this.tblBusinessModel.renderRows()
      })
    })
  }

  archiveBusinessOperation(businessModel: any, status: boolean) {
    this.dialog.open(DialogBusinessModelComponent, {
      maxWidth: "100vw",
      width: '100%',
      panelClass: 'full-screen-modal',
      backdropClass: "backdropBackground",
      disableClose: true,
      data: {
        action: "archiveBusinessModel",
        question1: status ? "Are you sure you want to activate this business model?" : "Are you sure you want to archive this business model?",
        businessModel,
        status,
        question2: status ? "RESTORE this DATA" : "ARCHIVE this Data?"
      }
    }).afterClosed().subscribe(dialogResponse => {
      if (dialogResponse.isArchived) {
        if (this.isArchived.getValue() == true) {
          this.dataSource.data.splice(this.dataSource.data.findIndex(dt => dt.code == dialogResponse.businessModelCode), 1)
          this.tblBusinessModel.renderRows() 
          this.total.next(this.total.getValue() - 1)
        }
        if (this.isArchived.getValue() == false) {
          this.dataSource.data.splice(this.dataSource.data.findIndex(dt => dt.code == dialogResponse.businessModelCode), 1)
          this.tblBusinessModel.renderRows() 
          this.total.next(this.total.getValue() - 1)
        }
      }
    })
  }

  search() {
    if (this.isArchived.getValue() == true) {
      this.dataSource.data = []
      this.textLoader.next("Loading...")
      this.populateArchivedBusinessModel();
    }
    if (this.isArchived.getValue() == false) {
      this.dataSource.data = []
      this.textLoader.next("Loading...")
      this.populateBusinessModels();
    }
  }

  exportToExcel() {
    let dataForExcel: any[] = []

    sampleData.forEach((row: any) => {
      dataForExcel.push(Object.values(row))
    })
    let reportData = {
      title: `Business Models`,
      data: dataForExcel,
      headers: ["Business Operation Code", "Business Operation Description", "Business Model Code", "Business Model Name", "Status"],
      columnColorNumber: 8,
      titleMergeCell: {
        from: 'A1',
        to: 'E2'
      }
    }
    this.utilsService.exportExcel(reportData)
    // this.businessModelService.getAllBusinessModel().subscribe(response => {
    //   console.log(response)
    //   response.forEach((row: any) => {
    //     dataForExcel.push(Object.values(row))
    //   })
    //   let reportData = {
    //     title: `Business Operations`,
    //     data: dataForExcel,
    //     headers: ["Business Operation Code", "Business Operation Description", "Business Model Code", "Business Model Name", "Status"],
    //     columnColorNumber: 8,
    //     titleMergeCell: {
    //       from: 'A1',
    //       to: 'C2'
    //     }
    //   }
    //   this.utilsService.exportExcel(reportData)
    // })
  }

  onChangePage(pageData: PageEvent) {
    this.page.next(pageData.pageIndex + 1);
    this.limit.next(pageData.pageSize);
    this.textLoader.next("Loading...")
    this.dataSource.data = []
    if (this.isArchived.getValue() == true) {
      this.populateArchivedBusinessModel();
    }
    if (this.isArchived.getValue() == false) {
      this.populateBusinessModels();
    }
  }
}

const sampleData = [
  {business_operation_code: 1001, business_operation_description: "SFO", business_model_code: "1001-01",business_model_name: "FRESH OPTIONS FOOD DELIVERY", status: "Active"}
]