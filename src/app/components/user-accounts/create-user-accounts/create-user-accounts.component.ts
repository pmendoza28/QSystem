import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
import { DialogUserAccountsComponent } from '../dialog-user-accounts/dialog-user-accounts.component';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-create-user-accounts',
  templateUrl: './create-user-accounts.component.html',
  styleUrls: ['./create-user-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserAccountsComponent implements OnInit, OnDestroy {

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private userAccountsService: UserAccountsService,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  /** @States */
  subs = new SubSink()
  firstname: UntypedFormControl = new UntypedFormControl("", [Validators.required]);
  lastname: UntypedFormControl = new UntypedFormControl("", [Validators.required]);
  username: UntypedFormControl = new UntypedFormControl("", [Validators.required, Validators.minLength(4)])
  password: UntypedFormControl = new UntypedFormControl("", [Validators.required, Validators.minLength(4)])
  role_id: UntypedFormControl = new UntypedFormControl(1, [Validators.required])
  roles$: Observable<any> = this.userAccountsService.getRoles();
  passwordHide = true;
  permissions: any[];
  isCloseConfirmationShow: boolean = false;
  @ViewChild("txtFirstName") txtFirstName: ElementRef;

  /** @LifeCycle */

  ngOnInit(): void {
    this.populatePermissions()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.txtFirstName.nativeElement.focus()
    this.changeDetectionRef.detectChanges()
  }

  /** @Methods */

  populatePermissions() {
    this.subs.add(
      this.userAccountsService.getPermissions(this.role_id.value).subscribe(res => {
        this.permissions = res;
        this.changeDetectionRef.detectChanges()
      })
    )
  }

  toggleClose() {
    this.router.navigate(["/admin/user-accounts"])
  }

  createUser() {
    if (this.isFormValid()) {
      this.subs.add(
        of({
          firstname: this.firstname.value.toUpperCase().trim(),
          lastname: this.lastname.value.toUpperCase().trim(),
          username: this.username.value,
          password: this.password.value,
          role_id: this.role_id.value,
          access_permission: this.permissions.filter(per => per.isChecked == true).map(selectedPermissions => selectedPermissions.id)
        }).subscribe((userForm) => {
          this.dialog.open(DialogUserAccountsComponent, {
            disableClose: true,
            maxWidth: "100vw",
            width: '100%',
            panelClass: 'full-screen-modal',
            backdropClass: "backdropBackground",
            data: {
              userForm,
              action: "createUserAccount",
              question1: "Are you sure you want to",
              question2: "CREATE?"
            }
          })
        })
      )
    }
  }

  isFormValid() {
    if (
      this.firstname.status == 'VALID' &&
      this.lastname.status == 'VALID' &&
      this.username.status == 'VALID' &&
      this.password.status == 'VALID' &&
      this.role_id.status == 'VALID' &&
      this.permissions.filter(per => per.isChecked == true).map(selectedPermissions => selectedPermissions.id).length > 0
    ) {
      return true
    }
    else {
      return false
    }
  }

}
