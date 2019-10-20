import { TestBed, inject } from '@angular/core/testing';

import { LiquidationNewService } from './liquidation-new.service';

describe('LiquidationNewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiquidationNewService]
    });
  });

  it('should be created', inject([LiquidationNewService], (service: LiquidationNewService) => {
    expect(service).toBeTruthy();
  }));
});
