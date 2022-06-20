import { TestBed } from '@angular/core/testing';

import { HernanieApiTestingService } from './hernanie-api-testing.service';

describe('HernanieApiTestingService', () => {
  let service: HernanieApiTestingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HernanieApiTestingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
