import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  selectedMenu: "overview" | "branches"  = "overview";
  ngOnInit(): void {
  }

  selectMenu(menu: "overview" | "branches") {
    this.selectedMenu = menu;
  }

}
