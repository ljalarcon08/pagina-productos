import { TestBed } from '@angular/core/testing';

import { GenericService } from './generic.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { LibAuthService } from '../lib-auth.service';

describe('GenericService', () => {
  let service: GenericService<Usuario>;
  let httpClientSpy:Spy<HttpClient>;
  let libService:Spy<LibAuthService>;
  let usuarios:Usuario[]=[{id:1,name:'nombre',email:'email',imagen:''},{id:2,name:'nombre',email:'email',imagen:''}];
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
        { provide: LibAuthService, useValue: createSpyFromClass(LibAuthService) },{provide:String,useValue:'url'}]
    });
    service = TestBed.inject(GenericService);
    httpClientSpy=TestBed.inject<any>(HttpClient);
    libService=TestBed.inject<any>(LibAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getElements',()=>{
    httpClientSpy.get.and.nextWith(usuarios);
    service.getElements().subscribe(resp=>expect(resp.length).toBe(2));
  });
  it('getElementById',()=>{
    httpClientSpy.get.and.nextWith(usuario);
    service.getElementById('id').subscribe(resp=>expect(resp.id).toBe(1));
  });
  it('crearElement',()=>{
    httpClientSpy.post.and.nextWith(usuario);
    service.crearElement(usuario).subscribe((resp=>expect(resp.id).toBe(1)));
  });
  it('actualizarElement',()=>{
    httpClientSpy.put.and.nextWith(usuario);
    service.actualizarElement(usuario,'1').subscribe((resp=>expect(resp.id).toBe(1)));
  });
  it('eliminarElement',()=>{
    httpClientSpy.delete.and.nextWith(true);
    service.eliminarElement('id').subscribe(resp=>expect(resp).toBeTrue());
  });
});
