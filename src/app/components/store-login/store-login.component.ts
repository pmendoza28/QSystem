import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.component.html',
  styleUrls: ['./store-login.component.scss']
})

export class StoreLoginComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) { }

  ngOnInit(): void {
  }

}