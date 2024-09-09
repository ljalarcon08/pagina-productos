import { TestBed } from '@angular/core/testing';

import { CarroService } from './carro.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CarroService', () => {
  let service: CarroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]      
    });
    service = TestBed.inject(CarroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
