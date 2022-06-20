import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin, from, fromEvent, interval, merge, Observable, of, Subject } from 'rxjs';
import { bufferCount, debounceTime, delay, filter, map, mergeAll, scan, shareReplay, take, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { RxjsTipsService } from './rxjs-tips.service';

@Component({
  selector: 'app-rxjs-tips',
  templateUrl: './rxjs-tips.component.html',
  styleUrls: ['./rxjs-tips.component.scss']
})
export class RxjsTipsComponent {

  constructor(
    private rxjsTipsService: RxjsTipsService
  ) { }

  todos$: Observable<any>
  ngOnInit(): void {
    // this.todos$ = this.rxjsTipsService.getTodos().pipe(delay(2000))
    // this.modified.subscribe(console.log)  
    // this.tapped.subscribe(console.log)
    // this.event.subscribe(console.log)
    // this.merge.subscribe(console.log)
    // this.combineLatest.subscribe({
    //   next: (res) => console.log(res),
    //   complete: () => console.log(`done`)
    // })
    // this.forkJoin.subscribe(console.log)
    this.myInterval.subscribe({ next: (res) => console.log(res), complete: () => console.log(`done`) })
    

  }

  sub = new Subject()
  myInterval: Observable<any> = interval(1000).pipe(
    tap(val => val == 10 && this.sub.next())
  );

  merge = merge(this.rxjsTipsService.getTodos(), this.rxjsTipsService.getPosts())
  combineLatest = combineLatest([this.rxjsTipsService.getTodos(), this.rxjsTipsService.getPosts()])
  forkJoin = forkJoin([this.rxjsTipsService.getTodos(), this.rxjsTipsService.getPosts()])

  source = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  modified = this.source.pipe(
    map(val => val * 2),
    filter(v => v > 10)
  )

  tapped = this.source.pipe(
    tap(val => val * 2),
  )

  // event = fromEvent(document, 'mousemove').pipe(debounceTime(1000))
  // event = fromEvent(document, 'mousemove').pipe(throttleTime(1000))
  // event = fromEvent(document, 'mousemove').pipe(bufferCount(20))





}