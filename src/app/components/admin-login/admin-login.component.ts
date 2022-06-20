import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { SubSink } from 'subsink';
import { AdminLoginService } from './admin-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminLoginComponent {

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private credentialsService: CredentialsService,
    private cdRef: ChangeDetectorRef,
    private adminLoginService: AdminLoginService,
    private snackbar: MatSnackBar,
  ) { }

  subs = new SubSink()
  loginForm: UntypedFormGroup = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required],
  })
  isLoggingIn = new BehaviorSubject(false)
  btnLoginText = new BehaviorSubject<"Login" | "Logging-In...">("Login")

  login() {
    this.isLoggingIn.next(true)
    this.btnLoginText.next("Logging-In...")

    this.subs.add(
      this.adminLoginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response)
          this.isLoggingIn.next(false)
          this.btnLoginText.next("Login")
          this.snackbar.open(response.message, "", { duration: 3000 })
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("user", JSON.stringify(response.data.user))
          this.router.navigate(["/admin/user-accounts"])  
        },
        error: (err) => {
          this.isLoggingIn.next(false)
          this.btnLoginText.next("Login")
          this.snackbar.open("Something went wrong", "", { duration: 3000 })
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
