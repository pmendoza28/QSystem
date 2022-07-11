import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGetApiArgument } from 'src/app/shared/models/shared.model';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessModelService {

  constructor(
    private http: HttpClient,
    private credService: CredentialsService
  ) { }

  getBusinessModel(query: IGetApiArgument) : Observable<{data: any, total: number}> {
    return this.http.get<{data: any, total: number}>(`${this.credService.port}/admin/search-business-model?search=${query.search}&limit=${query.limit}&page=${query.page}`).pipe(
      map((businessModel: any) => {
        return {
          data: businessModel.data,
          total: businessModel.total
        }
      })
    )
  }

  getBusinessModelById(businessModelId: number) : Observable<any> {
    return this.http.get(`${this.credService.port}/admin/get-business-model-by-id?id=${businessModelId}`)
  }

  getArchivedBusinessModel(query: IGetApiArgument): Observable<any> {
    return this.http.get(`${this.credService.port}/admin/search-business-operation-archived?search=${query.search}&limit=${query.limit}&page=${query.page}`)
  }

  archivedBusinessModel(businessModelId: number, status: boolean) : Observable<any> {
    return this.http.put(`${this.credService.port}/admin/archive-restore-business-model/${businessModelId}`, { status })
  }

  createBusinessModel(businessModelForm: {name: string; business_operation_code: string}): Observable<any> {
    return this.http.post(`${this.credService.port}/admin/businessmodel`, businessModelForm)
  }

  updateBusinessModel(businessModelId: number, businessModelForm: any): Observable<any> {
    return this.http.put(`${this.credService.port}/admin/businessmodel/${businessModelId}`, businessModelForm)
  }

  getAllBusinessModel(): Observable<any> {
    return this.http.get(`${this.credService.port}/admin/get-business-model-code-name`)
  }
  
}
