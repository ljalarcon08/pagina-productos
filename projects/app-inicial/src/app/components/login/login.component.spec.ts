import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImagenService } from '../../../../../app-admin/src/app/services/imagen.service';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { UsuarioService } from '../../services/usuario.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let libServiceS:LibAuthService;
  let libAuthServiceMock:jasmine.SpyObj<LibAuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations:[LoginComponent,MockImagenModal],
      providers:[NgbOffcanvasConfig,NgbOffcanvas,ImagenService,UsuarioService
        ,provideHttpClient(),provideHttpClientTesting()
        ,JwtHelperService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
        ,{provide:libServiceS,useValue:libAuthServiceMock}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  selector: 'app-imagen-modal',
  template: ''
})
class MockImagenModal {
}