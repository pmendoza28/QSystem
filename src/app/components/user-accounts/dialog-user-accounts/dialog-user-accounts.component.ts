import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { SubSink } from 'subsink';
import { UserAccountsService } from '../user-accounts.service';

@Component({
  selector: 'app-dialog-user-accounts',
  templateUrl: './dialog-user-accounts.component.html',
  styleUrls: ['./dialog-user-accounts.component.scss']
})
export class DialogUserAccountsComponent implements OnDestroy {

  constructor(
    private dialogRef: MatDialogRef<DialogUserAccountsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userAccountsService: UserAccountsService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  subs = new SubSink()
  isCreatingUserAccount$ = new BehaviorSubject(false);

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  errorCreateUserAccount: any;
  createUserAccount() {
    this.isCreatingUserAccount$.next(true)
    this.subs.add(
      this.userAccountsService.createUserAccount(this.data.userForm).subscribe({
        next: (response) => {
          this.isCreatingUserAccount$.next(false)
          this.snackbar.open(response.message, "", { duration: 3000 })
          this.dialogRef.close()
          this.router.navigate(["/admin/user-accounts"])
        },
        error: (err) => {
          this.isCreatingUserAccount$.next(false)
          this.snackbar.open(err.error.errors.username[0], "", { duration: 3000 })
        },
        complete: () => {
          
        }
      })
    )
  }

}
