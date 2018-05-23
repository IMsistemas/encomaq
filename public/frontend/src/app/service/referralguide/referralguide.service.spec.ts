import { TestBed, inject } from '@angular/core/testing';

import { ReferralguideService } from './referralguide.service';

describe('ReferralguideService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReferralguideService]
    });
  });

  it('should be created', inject([ReferralguideService], (service: ReferralguideService) => {
    expect(service).toBeTruthy();
  }));
});
