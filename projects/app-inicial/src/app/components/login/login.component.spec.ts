import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { ImagenService } from '../../../../../app-admin/src/app/services/imagen.service';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { UsuarioService } from '../../services/usuario.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { By } from '@angular/platform-browser';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import Swal from 'sweetalert2';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let libService:Spy<LibAuthService>;
  let usuarioService:Spy<UsuarioService>;
  let imagenService:Spy<ImagenService>;
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations:[LoginComponent,MockImagenModal,MockActualizaUsuario,MockInicioSesion],
      providers:[NgbOffcanvasConfig,NgbOffcanvas,ImagenService,UsuarioService
        ,{provide:LibAuthService,useValue:createSpyFromClass(LibAuthService)}
        ,{provide:UsuarioService,useValue:createSpyFromClass(UsuarioService)}
        ,{provide:ImagenService,useValue:createSpyFromClass(ImagenService)}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    usuarioService=TestBed.inject<any>(UsuarioService);
    libService=TestBed.inject<any>(LibAuthService);
    imagenService=TestBed.inject<any>(ImagenService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('abrir', () => {
    component.abrir(component.templateRef);
    expect(component).toBeTruthy();
  });
  it('cerrar',()=>{
    component.cerrar();
    expect(component.actDatos).toBe(false);
  });
  it('actualizarDatos',()=>{
    component.actualizarDatos(component.templateRef);
    component.offCanvas.close('close');
    expect(component.loginOk).toBe(false);
  });
  it('abrirModal',()=>{
    spyOn(component,'abrirModal');
    component.abrirModal(usuario);
    expect(component.abrirModal).toHaveBeenCalled();
  });
  it('cerrarSesion',(done)=>{
    component.loginOk=true;
    libService.logout.and.nextWith('OK');
    component.cerrarSesion();
    expect(component.swal.isVisible()).toBeTruthy();
    component.swal.clickConfirm();
    setTimeout(() => {
      expect(component.loginOk).toBe(false);
      done();
    });
  });
});

@Component({
  selector: 'app-imagen-modal',
  template: ''
})
class MockImagenModal {
}
@Component({
  selector: 'app-actualiza-usuario',
  template: ''
})
class MockActualizaUsuario {
  @Input() usuario:Usuario=new Usuario(1,'','','');
  @Input() offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype; 
}
@Component({
  selector: 'app-inicio-sesion',
  template: ''
})
class MockInicioSesion {
  @Input() offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype; 
}
