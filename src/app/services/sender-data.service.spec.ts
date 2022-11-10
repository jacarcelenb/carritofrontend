import { TestBed } from '@angular/core/testing';

import { SenderDataService } from '../service/sender-data.service';

describe('SenderDataService', () => {
  let service: SenderDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SenderDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
