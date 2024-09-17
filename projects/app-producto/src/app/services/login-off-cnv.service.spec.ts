import { TestBed } from '@angular/core/testing';

import { LoginOffCnvService } from './login-off-cnv.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Usuario } from '../../../../lib-auth/src/lib/models/usuario';

describe('LoginOffCnvService', () => {
  let service: LoginOffCnvService;
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};

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
  it('abrirCanvas',()=>{
    service.abrirCanvas(usuario);
    expect(service.ocultarOffCanvas).toBe(false);
  });
  it('cerrarCanvas',()=>{
    service.cerrarCanvas();
    expect(service.ocultarOffCanvas).toBe(true);
  });
});
