import { TestBed } from '@angular/core/testing';

import { ProductoService } from './producto.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';


describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    });
    service = TestBed.inject(ProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
