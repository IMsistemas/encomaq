import { TestBed, inject } from '@angular/core/testing';

import { ReasontransferService } from './reasontransfer.service';

describe('ReasontransferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReasontransferService]
    });
  });

  it('should be created', inject([ReasontransferService], (service: ReasontransferService) => {
    expect(service).toBeTruthy();
  }));
});
