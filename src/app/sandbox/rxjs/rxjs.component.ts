import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { fromEvent, interval, of } from 'rxjs';
import { debounceTime, map, mapTo, switchMap } from 'rxjs/operators';
import { RxjsService } from './rxjs.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxjsComponent implements OnInit {

  constructor(
    private rxjsService: RxjsService,
    private changeDetectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.switchMapOperator()

  }


  mapOperator() {
    of(1, 2, 3, 4)
      .pipe(mapTo((v: any) => v + 10))
      .subscribe(res => console.log(res), err => console.log(err), () => console.log(`done`))

    this.rxjsService.getTodos().pipe(
      map(res => res.map((data: any) => {
        return { id: data.id, completed: data.completed }
      }))
    ).subscribe(console.log)
  }
  searchControl: UntypedFormControl = new UntypedFormControl("", [Validators.required])
  counter: number = 0;
  switchMapOperator() {
    // fromEvent(document, "click").pipe(
    //   switchMap(() => interval(500))
    // ).subscribe(res => {
    //   this.counter = res
    //   this.changeDetection.detectChanges()
    // })
    this.searchControl.valueChanges.pipe(
      debounceTime(1000),
      switchMap(() => interval(500))
    ).subscribe(val => {
      this.counter = val
      this.changeDetectionRef.detectChanges()
    })

  }
}
