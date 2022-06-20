import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ITodo, StreamService } from './stream.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent {

  constructor(
    private streamService: StreamService,
    private cdRef: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.todos$ = this.streamService.getTodos()
    }, 3000);
  }

  age: number = 0;
  ngOnInit(): void {
    setInterval(() => {
      this.age++;
    }, 1000)
  }

  civilStatus(): Observable<"Single" | "Married"> {
    let status: "Single" | "Married" = "Single"
    this.age <= 18 ? status = "Single" : status = "Married";

    return new Observable(subs => {
      subs.next(status)
    })
  }

  isOpen$ = new BehaviorSubject(false)

  toggle() {
    this.isOpen$.next(!this.isOpen$.getValue())
  }

  datas$ = new BehaviorSubject([
    { name: "Phil" },
    { name: "Josh" },
  ])

  nameFC: UntypedFormControl = new UntypedFormControl("", [Validators.required, Validators.minLength(5)])

  checkData() {
    this.datas$.subscribe(console.log)
  }

  addName() {
    this.datas$.next(this.datas$.getValue().concat([{ name: this.nameFC.value }]))
  }

  trackNameIndex(index: any) {
    return index;
  }

  name$ = new BehaviorSubject({firstName: "Phil", lastName: "Mendoza"})
  todos$: Observable<any>
}

