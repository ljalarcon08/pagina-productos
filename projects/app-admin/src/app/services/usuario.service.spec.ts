import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { Rol } from '../../../../lib-auth/src/lib/models/rol';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpClientSpy:Spy<HttpClient>;
  let libService:Spy<LibAuthService>;
  let usuario={id:1,name:'nombre',email:'email',imagen:''};
  let respUsuario={
    usuarios:[{id:1,name:'nombre',email:'email',imagen:''},{id:2,name:'nombre',email:'email',imagen:''}],
    totalRegistros:2
  };
  let roles:Rol[]=[{id:1,name:'name'},{id:2,name:'name'}];
  let rol:Rol={id:1,name:'name'};


  beforeEach(() => {
    TestBed.configureTestingModule({providers:[
      {provide:LibAuthService,useValue:createSpyFromClass(LibAuthService)},
      { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
    ]});
    service = TestBed.inject(UsuarioService);
    httpClientSpy=TestBed.inject<any>(HttpClient);
    libService=TestBed.inject<any>(LibAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getUsuarioByEmail',()=>{
    httpClientSpy.get.and.nextWith(respUsuario.usuarios);
    service.getUsuarioByEmail('email').subscribe((resp:any)=>{
      expect(resp[0].id).toBe(1);
    });
  });
  it('getPaginaUsuarios',()=>{
    httpClientSpy.get.and.nextWith(respUsuario);
    service.getPaginaUsuarios(1,10).subscribe((resp:any)=>expect(resp.totalRegistros).toBe(2));
  });
  it('getRoles',()=>{
    httpClientSpy.get.and.nextWith(roles);
    service.getRoles().subscribe((resp:any)=>expect(resp.length).toBe(2));
  });
  it('crearRol',()=>{
    httpClientSpy.post.and.nextWith(rol);
    service.crearRol(rol).subscribe((resp:any)=>expect(resp.id).toBe(1));
  });
  it('actualizarUsuario',()=>{
    httpClientSpy.put.and.nextWith(usuario);
    service.actualizarUsuario(usuario).subscribe((resp:any)=>expect(resp.id).toBe(1));
  });
  it('actualizaImagenUsuario',()=>{
    httpClientSpy.put.and.nextWith(usuario);
    service.actualizaImagenUsuario(1,'img').subscribe((resp:any)=>expect(resp.id).toBe(1));
  })
  it('actualizarRol',()=>{
    httpClientSpy.put.and.nextWith(rol);
    service.actualizarRol(rol).subscribe((resp:any)=>expect(resp.id).toBe(1));
  });
  it('eliminaUsuario',()=>{
    httpClientSpy.delete.and.nextWith('ok');
    service.eliminarUsuario(1).subscribe(resp=>expect(resp).toBe('ok'));
  });
  it('eliminaRol',()=>{
    httpClientSpy.delete.and.nextWith('ok');
    service.eliminiarRol(1).subscribe(resp=>expect(resp).toBe('ok'));
  });
});
