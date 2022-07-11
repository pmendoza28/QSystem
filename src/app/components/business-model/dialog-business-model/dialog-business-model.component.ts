
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, of, ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { BusinessOperationService } from '../../business-operation/business-operation.service';
import { BusinessModelService } from '../business-model.service';

@Component({
  selector: 'app-dialog-business-model',
  templateUrl: './dialog-business-model.component.html',
  styleUrls: ['./dialog-business-model.component.scss']
})
export class DialogBusinessModelComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private businessOperationService: BusinessOperationService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private businessModelService: BusinessModelService,
    private utilsService: UtilsService,
    private snackbar: MatSnackBar
  ) { }

  businessOperations: any[] = []
  businessModelForm: FormGroup = this.fb.group({
    name: ["", Validators.required],
    business_operation_code: ["", Validators.required],
  })

  closeDialog() {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    if (this.data.action == 'businessModelForm') {
      this.populateBusinessOperations()
      this.subscribeDropDown()
    }

    if(this.data.action == 'editBusinessModelForm') {
      this.populateBusinessOperations()
      this.businessModelForm.setValue({
        name: this.data.businessModelForm.name,
        business_operation_code: this.data.businessModelForm.business_operation_code,
      })
    
    }
  }

  populateBusinessOperations() {
    this.businessOperationService.getAllBusinessOperations('', '').subscribe(response => {
      this.businessOperations = response
      this.businessOperationPlaceHolder = "Find Business Operation";
      this.filteredBusinessOperation.next(this.businessOperations.slice());
    })
  }


  public BusinessOperationFilterCtrl: FormControl = new FormControl();
  public filteredBusinessOperation: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  businessOperationPlaceHolder: "Loading..." | "Find Business Operation" | "No Business Operation Found" = "Loading...";

  protected _onDestroy = new Subject<void>();
  protected filterBusinessOperation() {
    if (!this.businessOperations) {
      return;
    }
    let search = this.BusinessOperationFilterCtrl.value;
    if (!search) {
      this.filteredBusinessOperation.next(this.businessOperations.slice());
      return;
    } else {
      search = search.toLowerCase();
    }

    this.filteredBusinessOperation.next(
      this.businessOperations.filter((ac: any) => ac.name.toLowerCase().indexOf(search) > -1)
    );
  }

  subscribeDropDown() {
    this.BusinessOperationFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBusinessOperation();
      });
  }


  showCreateDialog() {
    of({
      name: this.businessModelForm.value.name.toUpperCase(),
      business_operation_code: this.businessModelForm.value.business_operation_code
    }).subscribe(businessModelForm => {
      console.log(businessModelForm)
      this.dialog.open(DialogBusinessModelComponent, {
        maxWidth: "100vw",
        width: '100%',
        panelClass: 'full-screen-modal',
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          action: "submitBusinessModel",
          form: businessModelForm,
          question1: "Are you sure you want to",
          question2: "CREATE"
        }
      }).afterClosed().subscribe(dialogResponse => {
        if(dialogResponse.isCreated == true) {
          this.dialogRef.close(dialogResponse)
        }
      })
    })
  }

  isCreatingBusinessModel$ = new BehaviorSubject(false)
  createBusinessModel() {
    this.isCreatingBusinessModel$.next(true)
    console.log(this.data)
    this.businessModelService.createBusinessModel(this.data.form).subscribe(response => {
      this.isCreatingBusinessModel$.next(false)
      console.log(response)
      this.utilsService.alertDialog({icon: "check_circle", label: "Success!"})
      this.dialogRef.close({isCreated: true})
    }, err => {
      this.isCreatingBusinessModel$.next(false)
    })
    
  }

  showUpdateDialog() {
    console.log(this.businessModelForm.value)
    of({
      name: this.businessModelForm.value.name.toUpperCase(),
      business_operation_code: this.businessModelForm.value.business_operation_code
    }).subscribe(businessModelForm => {
      this.dialog.open(DialogBusinessModelComponent, {
        maxWidth: "100vw",
        width: '100%',
        panelClass: 'full-screen-modal',
        backdropClass: "backdropBackground",
        disableClose: true,
        data: {
          action: "UpdateBusinessModel",
          businessModelId: this.data.businessModelId,
          businessModelForm : {
            business_model_name: businessModelForm.name
          },
          question1: "Are you sure you want to",
          question2: "Save Edit?"
        }
      }).afterClosed().subscribe(dialogResposne => {
        if(dialogResposne.isUpdated == true) {
          this.dialogRef.close(dialogResposne)
        }
      })
    })
  }

  isUpdatingbusinessModel$ = new BehaviorSubject(false)
  updateBusinessModel() {
    this.isUpdatingbusinessModel$.next(true)
    this.businessModelService.updateBusinessModel(this.data.businessModelId, this.data.businessModelForm).subscribe(response => {
      console.log(response)
      this.isUpdatingbusinessModel$.next(false)
      if(response.message == 'No Changes') {
        this.snackbar.open(response.message, "", { duration: 3000 })
      }
      else {
        this.utilsService.alertDialog({icon: "check_circle", label: "Success!"})
        this.dialogRef.close({ isUpdated: true, businessModelId: this.data.businessModelId, updatedData: response.data })
      }

    }, err => {
      this.isUpdatingbusinessModel$.next(false)
    })
  }

  isArchivingBusinessModel$ = new BehaviorSubject(false)
  archiveBusinessModel() {
    this.isArchivingBusinessModel$.next(true)
    this.businessModelService.archivedBusinessModel(this.data.businessModel.id, this.data.status).subscribe(response => {
      this.isArchivingBusinessModel$.next(false)
      this.utilsService.alertDialog({icon:"check_circle", label: "Success!"})
      this.dialogRef.close({ isArchived: true, businessModelCode: response.data.code })
    })
  }
}
