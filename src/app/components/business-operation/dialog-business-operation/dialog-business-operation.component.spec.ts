import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBusinessOperationComponent } from './dialog-business-operation.component';

describe('DialogBusinessOperationComponent', () => {
  let component: DialogBusinessOperationComponent;
  let fixture: ComponentFixture<DialogBusinessOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBusinessOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBusinessOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
