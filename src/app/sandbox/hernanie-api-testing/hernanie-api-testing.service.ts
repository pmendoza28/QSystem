import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialsService } from 'src/app/shared/services/credentials.service';

@Injectable({
  providedIn: 'root'
})
export class HernanieApiTestingService {

  constructor(
    private credentialsService: CredentialsService,
    private http: HttpClient
  ) { }

  getUserAccounts(): Observable<any> {
    return this.http.get(`${this.credentialsService.port}/search?filter=&limit=3&page=1`)
  }

}
