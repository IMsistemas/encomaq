import { TestBed, inject } from '@angular/core/testing';

import { BplaceService } from './bplace.service';

describe('BplaceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BplaceService]
    });
  });

  it('should be created', inject([BplaceService], (service: BplaceService) => {
    expect(service).toBeTruthy();
  }));
});
