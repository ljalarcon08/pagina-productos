import { TestBed } from '@angular/core/testing';

import { LibAuthService } from './lib-auth.service';
import { HttpClient } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('LibAuthService', () => {
  let service: LibAuthService;
  let httpClientSpy:Spy<HttpClient>;
  let resp={jwt:'token'};
  const tokenTest='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbWFpbEBlbWFpbC5jb20iLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTcyNzEwNjMxNiwiZXhwIjoxNzI3MTQyMzE2fQ.Mp9jgJehnXyZeJVLLScm1rSd_5qtWqwWZpdwCXibLAg';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{ provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        JwtHelperService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
      ]
    });
    service = TestBed.inject(LibAuthService);
    httpClientSpy=TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getHeader',()=>{
    localStorage.setItem('token','tok');
    const header=service.getHeader();
    expect(header).not.toBeNull();
  });
  it('login',()=>{
    httpClientSpy.post.and.nextWith(resp);
    service.login('user','pass').subscribe(resp=>{
      expect(resp.jwt).toBe('token');
    });
  });
  it('checkToken',()=>{
    httpClientSpy.get.and.nextWith(true);
    service.checkToken().subscribe(resp=>expect(resp).toBeTrue());
  });
  it('getEmail',()=>{
    localStorage.setItem('token',tokenTest);
    const email=service.getEmail();
    expect(email).toBe('email@email.com');
  });
  it('signUp',()=>{
    httpClientSpy.get.and.nextWith(true);
    service.logout().subscribe(resp=>expect(resp).toBeTrue());
  });
  it('tieneRol',()=>{
    localStorage.setItem('token',tokenTest);
    const estadoRol=service.tieneRol('ROLE_USER');
    expect(estadoRol).not.toBeTrue();
  });
  it('quitarToken',()=>{
    service.quitarToken();
    const token=service.getToken();
    expect(token).toBeNull();
  });
});
