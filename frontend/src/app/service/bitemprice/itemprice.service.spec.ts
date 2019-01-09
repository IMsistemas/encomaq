import { TestBed, inject } from '@angular/core/testing';

import { ItempriceService } from './itemprice.service';

describe('ItempriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItempriceService]
    });
  });

  it('should be created', inject([ItempriceService], (service: ItempriceService) => {
    expect(service).toBeTruthy();
  }));
});
