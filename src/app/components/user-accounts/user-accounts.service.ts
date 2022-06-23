import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry, retryWhen, shareReplay, take, tap, timeout } from 'rxjs/operators';
import { IGetApiArgument } from 'src/app/shared/models/shared.model';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { IUserAccountForm, IUserAccountsTable, IRole, ICreateUserAccountResponse, IGetUserAccountByIdResponse } from './user-accounts.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountsService {

  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient,
    private snackbar: MatSnackBar
  ) { }

  getUserAccounts(query: IGetApiArgument): Observable<IUserAccountsTable> {
    return this.http.get<IUserAccountsTable>(`${this.credentialsService.port}/admin/user-accounts?search=${query.search}&limit=${query.limit}&page=${query.page}`).pipe(
      map(users => {
        return {
          data: users.data,
          total: users.total
        }
      }),
      catchError(error => {
        return throwError(error)
      }),
      timeout(10000)


    )
  }

  getArchivedUserAccounts(query: IGetApiArgument): Observable<any> {
    return this.http.get(`${this.credentialsService.port}/admin/user-accounts-archived?search=${query.search}&limit=${query.limit}100&page=${query.page}`).pipe(
      map((user: any) => {
        return {
          data: user.data,
          total: user.total
        }
      }),
      timeout(10000)
    )
  }

  getRoles(): Observable<IRole> {
    return this.http.get<IRole>(`${this.credentialsService.port}/role`)
  }

  getPermissions(role_id: number): Observable<any> {
    return this.http.get(`${this.credentialsService.port}/role-and-permissions?role_id=${role_id}`).pipe(
      map((permissions: any) => {
        return permissions.map((permission: any) => {
          return {
            ...permission,
            isChecked: false
          }
        })  
      })
    )
  }

  createUserAccount(userAccountForm: IUserAccountForm): Observable<ICreateUserAccountResponse> {
    return this.http.post<ICreateUserAccountResponse>(`${this.credentialsService.port}/admin/createuser`, userAccountForm).pipe(
      tap(val => console.log(val)),
      timeout(10000)
    )
  }

  // userAccountById$ = this.http.get(`${this.credentialsService.port}/getuserbyid?id=6`)
  getUserAccountById(userId: number): Observable<IGetUserAccountByIdResponse> {
    return this.http.get<IGetUserAccountByIdResponse>(`${this.credentialsService.port}/admin/getuserbyid?id=${userId}`)
  }

  updateUserAccountById(userId: number, userAccountForm: {
    firstname: string;
    lastname: string;
    username: string;
    role_id: number;
    access_permissions: number[]
  }): Observable<any> {
    return this.http.put(`${this.credentialsService.port}/admin/update-user/${userId}`, userAccountForm)
  }


  archiveUserAccountById(userId: number, status: boolean) {
    return this.http.put(`${this.credentialsService.port}/admin/archive-restore-user/${userId}`, { status })
  }

  resetPassword(userId: number): Observable<any> {
    return this.http.put(`${this.credentialsService.port}/admin/reset-user-password/${userId}`, {})
  }
}


