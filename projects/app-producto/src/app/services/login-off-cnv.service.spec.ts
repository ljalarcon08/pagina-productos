import { TestBed } from '@angular/core/testing';

import { LoginOffCnvService } from './login-off-cnv.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LoginOffCnvService', () => {
  let service: LoginOffCnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    });
    service = TestBed.inject(LoginOffCnvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
