import { TestBed } from '@angular/core/testing';

import { CarroService } from './carro.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Carro } from '../../../../lib-auth/src/lib/models/carro';

describe('CarroService', () => {
  let service: CarroService;
  let httpClientSpy: Spy<HttpClient>;
  let libService:Spy<LibAuthService>;
  let carro:Carro={email:'email',id:'id',productos:[
    {id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}
  ]};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:LibAuthService,useValue:createSpyFromClass(LibAuthService)},
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]      
    });
    service = TestBed.inject(CarroService);
    httpClientSpy=TestBed.inject<any>(HttpClient);
    libService=TestBed.inject<any>(LibAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getCarroEmail',()=>{
    httpClientSpy.get.and.nextWith(carro);
    service.getCarroEmail('email').subscribe((resp:any)=>expect(resp.email).toBe('email'));
  });
});
