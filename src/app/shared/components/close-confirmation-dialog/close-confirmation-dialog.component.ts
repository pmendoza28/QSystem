import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-close-confirmation-dialog',
  templateUrl: './close-confirmation-dialog.component.html',
  styleUrls: ['./close-confirmation-dialog.component.scss']
})
export class CloseConfirmationDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  isCloseConfirmationShow: boolean = false;
  toggleClose() {
    this.isCloseConfirmationShow = !this.isCloseConfirmationShow
  }

}
