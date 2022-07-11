import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAnimationComponent } from './table-animation.component';

describe('TableAnimationComponent', () => {
  let component: TableAnimationComponent;
  let fixture: ComponentFixture<TableAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
