import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { SubSink } from 'subsink';
import { BusinessOperationService } from '../business-operation.service';
const moment = require("moment")

@Component({
  selector: 'app-dialog-business-operation',
  templateUrl: './dialog-business-operation.component.html',
  styleUrls: ['./dialog-business-operation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogBusinessOperationComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogBusinessOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private businessOperationService: BusinessOperationService,
    private changeDetectionRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) { }


  subs = new SubSink();
  isCreatingBusinessOperation$ = new BehaviorSubject(false)
  businessOperationForm: FormGroup = this.fb.group({
    code: ["", Validators.required],
    name: ["", Validators.required],
  })

  ngOnInit(): void {
    if (this.data.action == "editBusinessOperation") {
      this.businessOperationForm.setValue({
        code: this.data.code,
        name: this.data.name
      })
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  transformBusinessOperationForm(): Observable<{ name: string, code: string }> {
    return of({
      code: this.businessOperationForm.value.code.trim(),
      name: this.businessOperationForm.value.name.toUpperCase().trim()
    })
  }


  createBusinessOperation() {
    this.isCreatingBusinessOperation$.next(true)
    this.subs.add(
      this.businessOperationService.createBusinessOperation(this.data.businessOperationForm).subscribe({
        next: (response) => {
          this.isCreatingBusinessOperation$.next(false)
          this.utilsService.alertDialog({icon: "check_circle", label: "Success!"})
          this.dialogRef.close({ created: true })
        },
        error: (err) => {
          console.log(err)
          this.isCreatingBusinessOperation$.next(false)
          this.snackbar.open(err.error.errors.code[0])
        }
      })
    )
  }

  showCreateConfirmationDialog() {
    this.dialog.open(DialogBusinessOperationComponent, {
      maxWidth: "100vw",
      width: '100%',
      panelClass: 'full-screen-modal',
      backdropClass: "backdropBackground",
      data: {
        question1: "Are you sure you want to",
        question2: "Create?",
        action: "submitBusinessOperationCreate",
        businessOperationForm: {
          code: this.businessOperationForm.value.code.trim(),
          name: this.businessOperationForm.value.name.toUpperCase().trim(),
        }
      }
    }).afterClosed().subscribe(dialogResponse => {
      if(dialogResponse.created == true) {
        this.dialogRef.close({ created: true })
      }
    })
  }

  isUpdatingBusinessOperation$ = new BehaviorSubject(false);
  updateBusinessOperation() {
    this.isUpdatingBusinessOperation$.next(true)
    this.subs.add(
      this.transformBusinessOperationForm().subscribe(businessOperationForm => {
        this.businessOperationService.updateBusinessOperation(this.data.businessOperationId, this.data.businessOperationForm).subscribe({
          next: (response) => {
            this.isUpdatingBusinessOperation$.next(false)
            if(response.message != "No Changes") {
              this.utilsService.alertDialog({icon: "check_circle", label: "Success!"})
              this.dialogRef.close({ data: response.data, isUpdated: true })
            }
            else {
              this.snackbar.open(response.message, "", { duration: 3000 })
            }
       
          },
          error: (err) => {
            console.log(err)
            this.isUpdatingBusinessOperation$.next(false)
          }
        })
      })
    )
  }

  showUpdateConfirmationDialog() {
    this.dialog.open(DialogBusinessOperationComponent, {
      maxWidth: "100vw",
      width: '100%',
      panelClass: 'full-screen-modal',
      backdropClass: "backdropBackground",
      data: {
        question1: "Are you sure you want to",
        question2: "Save Edit?",
        action: "submitBusinessOperationUpdate",
        businessOperationId: this.data.id,
        businessOperationForm: {
          code: this.businessOperationForm.value.code.trim(),
          name: this.businessOperationForm.value.name.toUpperCase().trim(),
        }
      }
    }).afterClosed().subscribe(dialogResponse =>  {
      if(dialogResponse.isUpdated == true) {
        this.dialogRef.close(dialogResponse)
      }
    })
  }
  isArchivingUserAccount$ = new BehaviorSubject(false)
  archiveBusinessOperation() {
    this.isArchivingUserAccount$.next(true)
    this.businessOperationService.archiveBusinessOperation(this.data.businessOperation.id, this.data.status).subscribe({
      next: (response) => {
        this.isArchivingUserAccount$.next(false)
        this.snackbar.open(response.message, "", { duration: 3000 })
        this.dialogRef.close({ isArchived: true })
      },
      error: (err) => {
        this.isArchivingUserAccount$.next(false)
      }
    })
  }

  isExporting$ = new BehaviorSubject(false)
  exportType: "Export All" | "Custom Date" = "Export All";
  dateStart: FormControl = new FormControl("", Validators.required)
  dateEnd: FormControl = new FormControl("", Validators.required)
  toggleExportType(type: "Export All" | "Custom Date") {
    type == "Export All" ? this.exportType = "Export All" : this.exportType = "Custom Date";
  }

  exportToExcel() {
    this.isExporting$.next(true)
    const dataForExcel: any[] = []
    if (this.exportType == "Export All") {
      of({
        start: "",
        end: ""
      }).subscribe(dateRange => {
        this.businessOperationService.getAllBusinessOperations(dateRange.start, dateRange.end).subscribe(response => {
          this.isExporting$.next(false)
          console.log(response)
          response.forEach((row: any) => {
            dataForExcel.push(Object.values(row))
          })
          let reportData = {
            title: `Business Operations`,
            data: dataForExcel,
            headers: ["Business Operation Code", "Business Operation Description", "Status"],
            columnColorNumber: 8,
            titleMergeCell: {
              from: 'A1',
              to: 'C2'
            }
          }
          this.utilsService.exportExcel(reportData)
        })
      })
    }
    if (this.exportType == "Custom Date") {
      of({
        start: moment(this.dateStart.value).format("YYYY-MM-DD"),
        end: moment(this.dateEnd.value).format("YYYY-MM-DD")
      }).subscribe(dateRange => {
        this.businessOperationService.getAllBusinessOperations(dateRange.start, dateRange.end).subscribe(response => {
          this.isExporting$.next(false)
          console.log(response)
          response.forEach((row: any) => {
            dataForExcel.push(Object.values(row))
          })
          let reportData = {
            title: `Business Operations`,
            data: dataForExcel,
            headers: ["Business Operation Code", "Business Operation Description", "Status"],
            columnColorNumber: 8,
            titleMergeCell: {
              from: 'A1',
              to: 'C2'
            }
          }
          this.utilsService.exportExcel(reportData)
        })
      })
    }
  }

}
