import { TestBed } from '@angular/core/testing';

import { LoginOffCnvService } from './login-off-cnv.service';

describe('LoginOffCnvService', () => {
  let service: LoginOffCnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginOffCnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
