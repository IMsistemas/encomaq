import { TestBed, inject } from '@angular/core/testing';

import { BpaymentformService } from './bpaymentform.service';

describe('BpaymentformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BpaymentformService]
    });
  });

  it('should be created', inject([BpaymentformService], (service: BpaymentformService) => {
    expect(service).toBeTruthy();
  }));
});
