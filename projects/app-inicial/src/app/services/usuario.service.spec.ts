import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Usuario } from '../../../../lib-auth/src/lib/models/usuario';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpClientSpy: Spy<HttpClient>;
  let libService:Spy<LibAuthService>;
  let usuarios:Usuario[]=[{id:1,name:'nombre',email:'email',imagen:''},{id:1,name:'nombre',email:'email',imagen:''}];
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};

  beforeEach(() => {
    TestBed.configureTestingModule(
      {
        providers:[
      {provide:LibAuthService,useValue:createSpyFromClass(LibAuthService)},UsuarioService,
      { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }]
    });
    service = TestBed.inject(UsuarioService);
    httpClientSpy=TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getUsuarioByEmail',()=>{
    httpClientSpy.get.and.nextWith(usuarios);
    service.getUsuarioByEmail('email').subscribe(resp=>{
      expect(resp).toHaveSize(usuarios.length);
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });
  it('actualizarUsuario',()=>{
    httpClientSpy.put.and.nextWith(usuario);
    service.actualizarUsuario(usuario).subscribe(resp=>{
      expect(resp.id).toEqual(usuario.id);
    });
    expect(httpClientSpy.put.calls.count()).toBe(1);
  });
  it('actualizaImagenUsuario',()=>{
    httpClientSpy.put.and.nextWith(usuario);
    service.actualizaImagenUsuario(1,'img').subscribe((resp:any)=>{
      expect(resp.id).toEqual(usuario.id);
    });
    expect(httpClientSpy.put.calls.count()).toBe(1);
  });
});
