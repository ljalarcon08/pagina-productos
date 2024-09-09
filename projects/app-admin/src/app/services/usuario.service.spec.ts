import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
      ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]});
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
