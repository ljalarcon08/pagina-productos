import { TestBed } from '@angular/core/testing';

import { ImagenService } from './imagen.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { LibAuthService } from '../lib-auth.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('ImagenService', () => {
  let service: ImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        ImagenService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }]
    });
    service = TestBed.inject(ImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('abrirModal',()=>{
    service.abrirModal('usuario','id','img');
  });
});
