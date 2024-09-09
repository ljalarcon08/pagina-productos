import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let libService:jasmine.SpyObj<LibAuthService>;
  beforeEach(() => {
    //TestBed.configureTestingModule({providers:[LibAuthService,provideHttpClientTesting()]});
    //service = TestBed.inject(UsuarioService);
    service=new UsuarioService(httpClientSpy,libService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
