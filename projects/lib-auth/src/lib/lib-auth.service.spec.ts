import { TestBed } from '@angular/core/testing';

import { LibAuthService } from './lib-auth.service';

describe('LibAuthService', () => {
  let service: LibAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LibAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
