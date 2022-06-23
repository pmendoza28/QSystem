import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
import { DialogUserAccountsComponent } from '../dialog-user-accounts/dialog-user-accounts.component';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-edit-user-accounts',
  templateUrl: './edit-user-accounts.component.html',
  styleUrls: ['./edit-user-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserAccountsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userAccountsService: UserAccountsService,
    private changeDetectionRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  user_id = new BehaviorSubject<number>(this.route.snapshot.params['user_id']);
  subs = new SubSink()
  firstname: FormControl = new FormControl("", [Validators.required]);
  lastname: FormControl = new FormControl("", [Validators.required]);
  username: FormControl = new FormControl("", [Validators.required])
  role_id: FormControl = new FormControl("", [Validators.required])
  roles$: Observable<any> = this.userAccountsService.getRoles();
  permissions: any[] = [];
  currentPermissions: any[] = []
  userAccountLoaded = new BehaviorSubject(false);
  ngOnInit(): void {
    this.populateUserAccount()
  }
  

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  populateUserAccount() {
    this.subs.add(
      this.userAccountsService.getUserAccountById(this.user_id.getValue()).subscribe(res => {
        console.log(res)
        this.userAccountLoaded.next(true)
        this.firstname.setValue(res.firstname)
        this.lastname.setValue(res.lastname)
        this.username.setValue(res.username)
        this.role_id.setValue(res.role.role_id)
        this.currentPermissions = res.access_permission
        this.populatePermissions()
      })
    )
  }

  toggleClose() {
    this.router.navigate(["/admin/user-accounts"])
  }

  updateUser() {
    if(this.isFormValid()) {
      of({
        firstname: this.firstname.value.toUpperCase().trim(),
        lastname: this.lastname.value.toUpperCase().trim(),
        username: this.username.value,
        role_id: this.role_id.value,
        access_permission: this.permissions.filter(per => per.isChecked == true).map(selectedPermissions => selectedPermissions.id)
      }).subscribe(userForm => {
        this.dialog.open(DialogUserAccountsComponent, {
          disableClose: true,
          data: {
            userId: this.user_id.getValue(),
            userForm,
            action: "updateUserAccount"
          }
        })
      })
    }
  }

  populatePermissions() {
    this.subs.add(
      this.userAccountsService.getPermissions(this.role_id.value).subscribe(res => {
        this.permissions = res.map((permission: any) => {
          return {
            ...permission,
            isChecked: this.currentPermissions.some(currentPermission => currentPermission.module_id == permission.id) ? true : false
          }
        });
        this.changeDetectionRef.detectChanges()
      })
    )
  }

  isFormValid() {
    if (
      this.firstname.status == 'VALID' &&
      this.lastname.status == 'VALID' &&
      this.username.status == 'VALID' &&
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
