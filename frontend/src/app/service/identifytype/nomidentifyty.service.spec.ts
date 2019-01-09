import { TestBed, inject } from '@angular/core/testing';

import { NomidentifytyService } from './nomidentifyty.service';

describe('NomidentifytyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NomidentifytyService]
    });
  });

  it('should be created', inject([NomidentifytyService], (service: NomidentifytyService) => {
    expect(service).toBeTruthy();
  }));
});
