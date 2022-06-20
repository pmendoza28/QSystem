import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HernanieApiTestingComponent } from './hernanie-api-testing.component';

describe('HernanieApiTestingComponent', () => {
  let component: HernanieApiTestingComponent;
  let fixture: ComponentFixture<HernanieApiTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HernanieApiTestingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HernanieApiTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
