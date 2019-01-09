import { TestBed, inject } from '@angular/core/testing';

import { CarrierService } from './carrier.service';

describe('CarrierService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarrierService]
    });
  });

  it('should be created', inject([CarrierService], (service: CarrierService) => {
    expect(service).toBeTruthy();
  }));
});
