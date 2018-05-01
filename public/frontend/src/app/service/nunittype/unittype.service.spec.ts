import { TestBed, inject } from '@angular/core/testing';

import { UnittypeService } from './unittype.service';

describe('UnittypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnittypeService]
    });
  });

  it('should be created', inject([UnittypeService], (service: UnittypeService) => {
    expect(service).toBeTruthy();
  }));
});
