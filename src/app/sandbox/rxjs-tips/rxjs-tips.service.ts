import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsTipsService {

  constructor(
    private http: HttpClient
  ) { }


  getTodos(): Observable<any> {
    return this.http.get("https://jsonplaceholder.typicode.com/todos")
  }

  getPosts(): Observable<any> {
    return this.http.get("https://jsonplaceholder.typicode.com/posts")
  }
}

interface IResponseObservable {
  isLoading: boolean;
  error: any;
  data: any
}