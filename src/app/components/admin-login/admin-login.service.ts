import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient
  ) { }

  login(loginForm: { username: string; password: string; }): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(`${this.credentialsService.port}/login`, loginForm).pipe(
      catchError(error => {
        return throwError(error)
      })
    )
  }
}

export interface ILoginResponse {
  data: {
    token: string;
    user: {
      id: number;
      firstname: string;
      lastname: string;
      is_active: boolean;
      username: string;
      access_permission: { module_id: number, module_desc: string }[]
      role: {
        role_id: number;
        role_desc: string;
      }
    }
  };
  message: string;
}

export interface IUser {
  id: number;
  firstname: string;
  lastname: string;
}