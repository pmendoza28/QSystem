import { TestBed } from '@angular/core/testing';

import { RxjsTipsService } from './rxjs-tips.service';

describe('RxjsTipsService', () => {
  let service: RxjsTipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RxjsTipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
