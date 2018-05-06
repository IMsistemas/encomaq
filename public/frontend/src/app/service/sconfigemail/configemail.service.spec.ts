import { TestBed, inject } from '@angular/core/testing';

import { ConfigemailService } from './configemail.service';

describe('ConfigemailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigemailService]
    });
  });

  it('should be created', inject([ConfigemailService], (service: ConfigemailService) => {
    expect(service).toBeTruthy();
  }));
});
