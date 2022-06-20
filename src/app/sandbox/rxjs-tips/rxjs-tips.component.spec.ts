import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsTipsComponent } from './rxjs-tips.component';

describe('RxjsTipsComponent', () => {
  let component: RxjsTipsComponent;
  let fixture: ComponentFixture<RxjsTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
