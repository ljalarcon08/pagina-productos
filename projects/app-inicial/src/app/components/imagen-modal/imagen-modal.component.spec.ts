import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenModalComponent } from './imagen-modal.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ImagenService } from '../../../../../lib-auth/src/lib/services/imagen.service';
import { createFunctionSpy, createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';
import Swal from 'sweetalert2';


describe('ImagenModalComponent', () => {
  let component: ImagenModalComponent;
  let fixture: ComponentFixture<ImagenModalComponent>;
  let imagenService:Spy<ImagenService>;
  let usuarioService:Spy<UsuarioService>;
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};  
  


  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [ImagenModalComponent],
      imports:[FormsModule],
      providers:[
        {provide:ImagenService,useValue:createSpyFromClass(ImagenService)},
        {provide:UsuarioService,useValue:createSpyFromClass(UsuarioService)}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenModalComponent);
    imagenService=TestBed.inject<any>(ImagenService);
    usuarioService=TestBed.inject<any>(UsuarioService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('cerrarModal',()=>{
    spyOn(component,'cerrarModal').and.callThrough();
    component.cerrarModal();
    expect(component.cerrarModal).toHaveBeenCalled();
  });
  it('revisarImagen',()=>{
    imagenService.revisaTipoImagen.and.returnValue(true);
    component.imgCheck='imagen';
    let event={
      target:{
        value:'imagen'
      }
    };
    component.revisarImagen(event);
    expect(component.imgTemp).toBe('imagen');
  });
  it('revisarImagen1',()=>{
    imagenService.revisaTipoImagen.and.returnValue(true);
    component.imgCheck='imagen';
    let event={
      target:{
        value:''
      }
    };
    component.revisarImagen(event);
    expect(component.imgTemp).toBe('');
  });
  it('cambiarImagen',()=>{
    spyOn(component,'cambiarImagen').and.callThrough();
    component.cambiarImagen();
    expect(component.cambiarImagen).toHaveBeenCalled();
  });
  it('subirImagen',()=>{
    usuarioService.actualizaImagenUsuario.and.nextWith(usuario);
    spyOn(component,'cerrarModal').and.callThrough();
    imagenService.id='1';
    imagenService.tipo='usuario';
    component.subirImagen();
    fixture.detectChanges();
    component.swal.clickConfirm();
    fixture.detectChanges();
    expect(component.cerrarModal).toHaveBeenCalled();
  });
});
