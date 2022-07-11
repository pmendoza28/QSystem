import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrderTypeComponent } from './dialog-order-type.component';

describe('DialogOrderTypeComponent', () => {
  let component: DialogOrderTypeComponent;
  let fixture: ComponentFixture<DialogOrderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogOrderTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogOrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
