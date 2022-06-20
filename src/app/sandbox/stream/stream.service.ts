import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<any> {
    return this.http.get("https://jsonplaceholder.typicode.com/todos")
  }
}


export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean
}