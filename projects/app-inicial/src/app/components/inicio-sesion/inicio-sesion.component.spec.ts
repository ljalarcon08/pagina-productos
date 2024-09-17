import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioSesionComponent } from './inicio-sesion.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { AbstractControlOptions, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';

describe('InicioSesionComponent', () => {
  let component: InicioSesionComponent;
  let fixture: ComponentFixture<InicioSesionComponent>;
  let usuarioService:Spy<UsuarioService>;
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};
  let formBuilder: FormBuilder;
  let libService:Spy<LibAuthService>;
  let usuarios:Usuario[]=[{id:1,name:'nombre',email:'email',imagen:''},{id:1,name:'nombre',email:'email',imagen:''}];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioSesionComponent],
      imports:[FormsModule,ReactiveFormsModule],
      providers:[{provide:LibAuthService,useValue:createSpyFromClass(LibAuthService)},
        {provide:UsuarioService,useValue:createSpyFromClass(UsuarioService)},FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioSesionComponent);
    usuarioService=TestBed.inject<any>(UsuarioService);
    libService=TestBed.inject<any>(LibAuthService);
    formBuilder=TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.signUpForm=formBuilder.group({
      nombre:['nombre',Validators.required],
      email:['email@email.com',[Validators.required,Validators.email]],
      password:['1',[Validators.required]],
      password2:['1',[Validators.required]]
    },{validators:component.revisarPasswords('password','password2')} as AbstractControlOptions);
    component.loginForm=formBuilder.group({
      email:['email@email.com',[Validators.required,Validators.email]],
      password:['pass',[Validators.required]]
    }); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('login',()=>{
    component.submitF=true;
    libService.login.and.nextWith({jwt:'jwt'});
    usuarioService.getUsuarioByEmail.and.nextWith(usuarios);
    fixture.detectChanges();
    expect(component.usuario).toBeInstanceOf(Usuario);
  });
  it('campoError',()=>{
    component.submitF=true;
    const estado=component.campoError('nombre',component.loginForm);
    fixture.detectChanges();
    expect(estado).toBe(false);  
  });
  it('campoErro1',()=>{
    component.submitF=false;
    const estado=component.campoError('nombre',component.loginForm);
    fixture.detectChanges();
    expect(estado).toBe(false);  
  });
  it('cerrar',()=>{
    component.cerrar();
    expect(component.submitF).toBe(false);
  });
  it('abrirRegistrar',()=>{
    component.abrirRegistrar();
    expect(component.registrar).toBe(true);
  })
  it('revisarPasswords',()=>{
    component.revisarPasswords('password','password2');
    fixture.detectChanges();
    expect(component.signUpForm.get('password2')?.errors).toBeNull();
  });
  it('revisarPasswords',()=>{
    component.signUpForm.patchValue({password:''});
    fixture.detectChanges();
    component.revisarPasswords('password','password2');
    expect(component.signUpForm.get('password2')?.errors).not.toBeNull();
  });
  it('signUp',()=>{
    libService.signUp.and.nextWith(usuario);
    expect(component.usuario.id).toBe(1);
  });
});
