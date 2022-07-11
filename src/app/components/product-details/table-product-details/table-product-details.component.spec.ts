import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableProductDetailsComponent } from './table-product-details.component';

describe('TableProductDetailsComponent', () => {
  let component: TableProductDetailsComponent;
  let fixture: ComponentFixture<TableProductDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableProductDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
