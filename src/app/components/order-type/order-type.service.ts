import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IGetApiArgument } from 'src/app/shared/models/shared.model';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class OrderTypeService {

  constructor(
    private http: HttpClient,
    private credentialsService: CredentialsService
  ) { }

  getOrderType(query: IGetApiArgument): Observable<any> {
    return this.http.get(`${this.credentialsService.port}/admin/search-order-type?search=${query.search}&limit=${query.limit}&page=${query.page}`).pipe(
      map((orderType: any) => {
        return {
          data: orderType.data,
          total: orderType.total
        }
      })
    )
  }

  createOrderType(OrderTypeForm: {name: string; code: string; business_model_code: string;}): Observable<any> {
    return this.http.post(`${this.credentialsService.port}/admin/ordertype`, OrderTypeForm)
  }

  getOrderTypeArchived(query: IGetApiArgument): Observable<any> {
    return this.http.get(`${this.credentialsService.port}/admin/search-order-type-archived?search=${query.search}&limit=${query.limit}&page=${query.page}`).pipe(
      map((orderTypes:any) => {
        return {
          data: orderTypes.data,
          total: orderTypes.total
        }
      })
    )
  }

  updateOrderType(orderTypeId: number, orderTypeForm: {name: string; code: string; business_model_code: string;}): Observable<any> {
    return this.http.put(`${this.credentialsService.port}/admin/ordertype/${orderTypeId}`,orderTypeForm)
  }

  archiveOrderType(orderTypeId: number, status: boolean): Observable<any> {
    return this.http.put(`${this.credentialsService.port}/admin/archive-restore-order-type/${orderTypeId}`,{ status})
  }

  getOrderTypeForExport(): Observable<any> {
    return this.http.get(`${this.credentialsService.port}/admin/ordertype`).pipe(
      map((orderTypes: any) => {
        return orderTypes.map((orderType: any) => {
          return {
            id: orderType.id,
            order_type_code: orderType.code,
            description: orderType.name,
            business_model_code: orderType.business_model_code,
            business_model_name: orderType.business_model.name,
            status: orderType.is_active == true ? "Active" : "Archived",
            date_created: moment(orderType.created_at).format("MMM DD, yyyy hh:mm:ss a")
          }
        })
      })
    )
  }
}
