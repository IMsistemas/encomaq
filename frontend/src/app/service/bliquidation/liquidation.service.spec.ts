import { TestBed, inject } from '@angular/core/testing';

import { LiquidationService } from './liquidation.service';

describe('LiquidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiquidationService]
    });
  });

  it('should be created', inject([LiquidationService], (service: LiquidationService) => {
    expect(service).toBeTruthy();
  }));
});
