import { TestBed } from '@angular/core/testing';

import { GenericService } from './generic.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';

describe('GenericService', () => {
  let service: GenericService<Usuario>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    });
    service = TestBed.inject(GenericService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
