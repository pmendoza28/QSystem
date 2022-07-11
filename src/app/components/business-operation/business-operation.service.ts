import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, timeout } from 'rxjs/operators';
import { IGetApiArgument } from 'src/app/shared/models/shared.model';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessOperationService {

  constructor(
    private http: HttpClient,
    private credentialsService: CredentialsService
  ) { }

  getBusinessOperation(search: string, limit: number, page: number): Observable<any> {
    return this.http.get(`${this.credentialsService.port}/admin/search-business-operation?search=${search}&limit=${limit}&page=${page}`).pipe(
      map((businessOperations: any) => {
        return {
          data: businessOperations.data,
          total: businessOperations.total
        }
      }),
      timeout(10000)
    )
  }

  createBusinessOperation(businessOperationForm: {
    code: string;
    name: string;
  }): Observable<{ data: any, message: string }> {
    return this.http.post<{ data: any, message: string }>(`${this.credentialsService.port}/admin/business-operation`, businessOperationForm)
  }

  getBusinessOperationByID(businessOperationId: number): Observable<{
    id: number;
    code: string;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  }> {
    return this.http.get<{
      id: number;
      code: string;
      name: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    }>(`${this.credentialsService.port}/admin/get-business-operation-by-id?id=${businessOperationId}`)
  }

  updateBusinessOperation(businessOperationId: number, businessOperationForm: { code: string; name: string; }): Observable<{
    message: string;
    data?: {
      id: number;
      code: string;
      name: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    }
  }> {
    return this.http.put<{
      message: string;
      data?: {
        id: number;
        code: string;
        name: string;
        is_active: boolean;
        created_at: string;
        updated_at: string;
      }
    }>(`${this.credentialsService.port}/admin/business-operation/${businessOperationId}`, businessOperationForm)
  }

  archiveBusinessOperation(businessOperationId: number, status: boolean): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.credentialsService.port}/admin/archive-restore-business-operation/${businessOperationId}`, { status })
  }

  getArchivedBusinessOperations(query: IGetApiArgument): Observable<any> {
    return this.http.get(`${this.credentialsService.port}/admin/search-business-operation-archived?search=${query.search}&limit=${query.limit}&page=${query.page}`)
  }

  getAllBusinessOperations(start: string, end: string): Observable<any> {
    return this.http.get<any>(`${this.credentialsService.port}/admin/business-operation?start=${start}&end=${end}`)
  }

  

  
}


