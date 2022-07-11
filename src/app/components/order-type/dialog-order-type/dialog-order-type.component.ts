import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, of, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { UtilsService } from 'src/app/shared/services/utils.service';
import { BusinessModelService } from '../../business-model/business-model.service';
import { OrderTypeService } from '../order-type.service';

@Component({
  selector: 'app-dialog-order-type',
  templateUrl: './dialog-order-type.component.html',
  styleUrls: ['./dialog-order-type.component.scss']
})
export class DialogOrderTypeComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DialogOrderTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private businessModelService: BusinessModelService,
    private orderTypeService: OrderTypeService,
    private utilsService: UtilsService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (this.data.action == "CreateOrderTypeForm") {
      this.populateBusinessModel()
      this.subscribeDropDown()
    }
    if (this.data.action == "UpdateOrderTypeForm") {
      this.populateBusinessModel()
      this.subscribeDropDown()
      this.fillUpForm()
    }
  }

  populateBusinessModel() {
    this.businessModelService.getAllBusinessModel().subscribe(response => {
      this.businessModels = response
      this.businessModelPlaceHolder = "Find Business Model"
      this.filteredBusinessModel.next(this.businessModels.slice());
    })
  }

  fillUpForm() {
    this.orderTypeForm.setValue({
      name: this.data.orderTypeForm.name,
      code: this.data.orderTypeForm.code,
      business_model_code: this.data.orderTypeForm.business_model_code,
    })
  }

  businessModels: any = [];
  public BusinessModelFilterCtrl: FormControl = new FormControl();
  public filteredBusinessModel: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  businessModelPlaceHolder: "Loading..." | "Find Business Model" | "No Business Model Found" = "Loading...";

  protected _onDestroy = new Subject<void>();
  protected filterBusinessModel() {
    if (!this.businessModels) {
      return;
    }
    let search = this.BusinessModelFilterCtrl.value;
    if (!search) {
      this.filteredBusinessModel.next(this.businessModels.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredBusinessModel.next(
      this.businessModels.filter((ac: any) => ac.name.toLowerCase().indexOf(search) > -1)
    );
  }

  subscribeDropDown() {
    this.BusinessModelFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBusinessModel();
      });
  }

  orderTypeForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    code: ["", Validators.required],
    business_model_code: ["", Validators.required],
  })



  showCreateConfirmationDialog() {
    of({
      name: this.orderTypeForm.value.name.toUpperCase(),
      code: this.orderTypeForm.value.code,
      business_model_code: this.orderTypeForm.value.business_model_code,
    }).subscribe(orderTypeForm => {
      this.dialog.open(DialogOrderTypeComponent, {
        maxWidth: "100vw",
        width: '100%',
        panelClass: 'full-screen-modal',
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          question1: "Are you sure you want to",
          question2: "Create?",
          action: "submitCreateOrderType",
          orderTypeForm
        }
      }).afterClosed().subscribe(dialogResponse => {
        if (dialogResponse.isCreated) {
          this.dialogRef.close(dialogResponse)
        }
      })
    })

  }

  isCreatingOrderType$ = new BehaviorSubject(false)
  createOrderType() {
    this.isCreatingOrderType$.next(true)
    console.log(this.data.orderTypeForm)
    this.orderTypeService.createOrderType(this.data.orderTypeForm).subscribe({
      next: (response) => {
        this.isCreatingOrderType$.next(false)
        this.utilsService.alertDialog({ icon: "check_circle", label: "Success!" })
        this.dialogRef.close({ isCreated: true })
      },
      error: (err) => {
        this.snackbar.open(err.error.errors.id[0], "", { duration: 3000 })
        this.isCreatingOrderType$.next(false)
      }
    })
  }


  showUpdateConfirmationDialog() {
    of({
      name: this.orderTypeForm.value.name.toUpperCase(),
      code: this.orderTypeForm.value.code,
      business_model_code: this.orderTypeForm.value.business_model_code,
    }).subscribe((orderTypeForm: any) => {
      this.dialog.open(DialogOrderTypeComponent, {
        maxWidth: "100vw",
        width: '100%',
        panelClass: 'full-screen-modal',
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          orderTypeForm,
          orderTypeId: this.data.orderTypeId,
          action: "SubmitUpdateOrderType",
          question1: "Are you sure you want to",
          question2: "Save edit",
        }
      }).afterClosed().subscribe(dialogResponse => {
        if (dialogResponse.isUpdated == true) {
          this.dialogRef.close(dialogResponse)
        }
      })
    })
  }

  isUpdatingOrderType$ = new BehaviorSubject(false)
  updateOrderType() {
    this.isUpdatingOrderType$.next(true)
    this.orderTypeService.updateOrderType(this.data.orderTypeId, this.data.orderTypeForm).subscribe({
      next: (response) => {
        this.isUpdatingOrderType$.next(false)
        this.utilsService.alertDialog({ icon: "check_circle", label: "Success!" })
        if (response.message == "No Changes") {
          this.snackbar.open(response.message, "", { duration: 3000 })
        }
        else {
          this.dialogRef.close({ isUpdated: true, orderType: response.data })
        }

      },
      error: (err) => {
        this.isUpdatingOrderType$.next(false)
      }
    })
  }

  isArchivingOrderType$ = new BehaviorSubject(false)
  archiveOrderType() {
    this.isArchivingOrderType$.next(true)
    this.orderTypeService.archiveOrderType(this.data.orderTypeId, this.data.status).subscribe({
      next: (response) => {
        this.isArchivingOrderType$.next(false)
        this.utilsService.alertDialog({ icon: "check_circle", label: "Success!" })
        this.dialogRef.close({ isArchived: true, orderTypeId: response.data.id })
      },
      error: (err) => {
        this.isArchivingOrderType$.next(false)
      }
    })
  }


}
