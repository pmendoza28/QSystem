import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SubSink } from 'subsink';
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
    private userAccountsService: UserAccountsService,
    private changeDetectionRef: ChangeDetectorRef,
    private fb: FormBuilder
  ) { }

  user_id: Observable<number> = new BehaviorSubject<number>(this.route.snapshot.params['user_id']);
  userAccount$: Observable<{
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    role_id: number;
    access_permission: number[]
  }> = of({
    id: 1,
    firstname: "PHILIP JOSHUA",
    lastname: "MENDOZA",
    role_id: 1,
    username: "pmendoza",
    password: "pmendoza",
    access_permission: [1, 2, 3, 4]
  })

  subs = new SubSink()
  firstname: FormControl = new FormControl("", [Validators.required]);
  lastname: FormControl = new FormControl("", [Validators.required]);
  username: FormControl = new FormControl("", [Validators.required])
  password: FormControl = new FormControl("", [Validators.required])
  role_id: FormControl = new FormControl("", [Validators.required])
  roles$: Observable<any> = this.userAccountsService.getRoles();
  permissions: any[] = [];
  userAccount: {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    role_id: number;
    access_permission: number[]
  }

  sampleForm: FormGroup = this.fb.group({
    username: [],
    password: []
  })
  ngOnInit(): void {
    this.populateUserAccount()
    this.populatePermissions()
    
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  populateUserAccount() {
    this.subs.add(
      this.userAccount$.subscribe(response => {
        this.firstname.setValue(response.firstname)
        this.lastname.setValue(response.lastname)
        this.username.setValue(response.username)
        this.role_id.setValue(response.role_id)
      })
    )
  }

  toggleClose() {
    this.router.navigate(["/admin/user-accounts"])
  }

  updateUser() {

  }

  populatePermissions() {
    this.subs.add(
      this.userAccountsService.getPermissions(this.role_id.value).subscribe(res => {
        this.permissions = res;
        this.changeDetectionRef.detectChanges()
      })
    )
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
