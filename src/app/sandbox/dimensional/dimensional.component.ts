import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dimensional',
  templateUrl: './dimensional.component.html',
  styleUrls: ['./dimensional.component.scss']
})
export class DimensionalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    

    from([1,2,3]).pipe(
      map((val, index) => {
        console.log(val, index)
      })
    ).subscribe(console.log)
  }


}
