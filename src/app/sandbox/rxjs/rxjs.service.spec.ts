import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RxjsService } from './rxjs.service';

describe('RxjsService', () => {
  let service: RxjsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(RxjsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
