import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { StreamService } from './stream.service';

describe('StreamService', () => {
  let service: StreamService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(StreamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
