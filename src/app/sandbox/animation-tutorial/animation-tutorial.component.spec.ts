import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationTutorialComponent } from './animation-tutorial.component';

describe('AnimationTutorialComponent', () => {
  let component: AnimationTutorialComponent;
  let fixture: ComponentFixture<AnimationTutorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimationTutorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimationTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
