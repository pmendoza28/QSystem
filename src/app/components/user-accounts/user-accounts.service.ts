import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, map, retry, retryWhen, take, tap, timeout } from 'rxjs/operators';
import { IGetApiArgument } from 'src/app/shared/models/shared.model';
import { CredentialsService } from 'src/app/shared/services/credentials.service';
import { IUserAccountForm, IUserAccountsTable, IRole, ICreateUserAccountResponse } from './user-accounts.model';

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
      delay(2000),
      map(users => {
        return {
          data: users.data,
          total: users.total
        }
      }),
      catchError(error => {
        return of(error)
      }),
      retryWhen(
        error => error.pipe(
          delay(2000),
          take(5),
        )
      ),
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
}


