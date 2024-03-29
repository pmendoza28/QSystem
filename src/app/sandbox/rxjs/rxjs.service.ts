import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<any> {
    return this.http.get<{userId: number; id: number; title: string; completed: boolean}>("https://jsonplaceholder.typicode.com/todos")
  }

}
