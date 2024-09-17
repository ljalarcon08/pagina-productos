import { TestBed } from '@angular/core/testing';

import { CatalogoService } from './catalogo.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { Catalogo } from '../../../../lib-auth/src/lib/models/catalogo';

describe('CatalogoService', () => {
  let service: CatalogoService;
  let httpClientSpy: Spy<HttpClient>;
  let libService:Spy<LibAuthService>;
  let catalogo:Catalogo={id:'1',name:'name',url:'url'};

  beforeEach(() => {
    TestBed.configureTestingModule({providers:[
      {provide:LibAuthService,useValue:createSpyFromClass(LibAuthService)},
      { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
    ]});
    service = TestBed.inject(CatalogoService);
    httpClientSpy=TestBed.inject<any>(HttpClient);
    libService=TestBed.inject<any>(LibAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('actualizarImagen',()=>{
    httpClientSpy.put.and.nextWith(catalogo);
    service.actualizarImagen('id','img').subscribe((resp:any)=>expect(resp.id).toBe(catalogo.id));
  });
});
