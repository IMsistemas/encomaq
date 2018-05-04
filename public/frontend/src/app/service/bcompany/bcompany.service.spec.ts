import { TestBed, inject } from '@angular/core/testing';

import { BcompanyService } from './bcompany.service';

describe('BcompanyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BcompanyService]
    });
  });

  it('should be created', inject([BcompanyService], (service: BcompanyService) => {
    expect(service).toBeTruthy();
  }));
});
