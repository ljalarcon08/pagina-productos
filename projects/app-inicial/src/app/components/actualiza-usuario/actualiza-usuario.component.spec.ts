import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaUsuarioComponent } from './actualiza-usuario.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AbstractControlOptions, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Component, Input } from '@angular/core';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('ActualizaUsuarioComponent', () => {
  let component: ActualizaUsuarioComponent;
  let fixture: ComponentFixture<ActualizaUsuarioComponent>;
  let httpClientSpy: Spy<HttpClient>;
  let usuarioService:Spy<UsuarioService>;
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizaUsuarioComponent],
      imports:[FormsModule,ReactiveFormsModule],
      providers:[{provide:UsuarioService,useValue:createSpyFromClass(UsuarioService)},FormBuilder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaUsuarioComponent);
    usuarioService=TestBed.inject<any>(UsuarioService);
    component = fixture.componentInstance;
    formBuilder=TestBed.inject(FormBuilder);
    component.actualizarForm=formBuilder.group({
      nombre:['nombre',Validators.required],
      email:['email@email.com',[Validators.required,Validators.email]],
      password:['1',[Validators.required]],
      password2:['1',[Validators.required]]
    },{validators:component.revisarPasswords('password','password2')} as AbstractControlOptions);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('actualizarUsuario', () => {
    usuarioService.actualizarUsuario.and.nextWith(usuario);
    component.actualizarUsuario();
    expect(usuarioService.actualizarUsuario.calls.count()).toBe(1);
  });
  it('campoError',()=>{
    const estado=component.campoError('nombre');
    component.submitM=true;
    expect(estado).toBe(false);
  });
  it('campoError1',()=>{
    component.actualizarForm.patchValue({nombre:'nombre'});
    const estado=component.campoError('nombre');
    component.submitM=false;
    expect(estado).toBe(false);
  });
  it('cerrar',()=>{
      spyOn(component,'cerrar').and.callThrough();
      component.cerrar();
      expect(component.cerrar).toHaveBeenCalled();
  });

});