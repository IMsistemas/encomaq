import { TestBed, inject } from '@angular/core/testing';

import { BperiodService } from './bperiod.service';

describe('BperiodService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BperiodService]
    });
  });

  it('should be created', inject([BperiodService], (service: BperiodService) => {
    expect(service).toBeTruthy();
  }));
});
