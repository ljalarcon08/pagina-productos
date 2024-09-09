import { TestBed } from '@angular/core/testing';

import { CatalogoService } from './catalogo.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('CatalogoService', () => {
  let service: CatalogoService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
      ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]});
    service = TestBed.inject(CatalogoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
