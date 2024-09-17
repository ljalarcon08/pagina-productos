import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDialogComponent } from './usuario-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { MatSelectModule } from '@angular/material/select';
import { Rol } from '../../../../../lib-auth/src/lib/models/rol';

describe('UsuarioDialogComponent', () => {
  let component: UsuarioDialogComponent;
  let fixture: ComponentFixture<UsuarioDialogComponent>;
  let formBuilder:FormBuilder;
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};  
  let usuarioService:Spy<UsuarioService>;
  let rolesV:number[]=[];
  let roles:Rol[]=[{id:1,name:'rol1'},{id:2,name:'rol1'}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuarioDialogComponent],
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,MatInputModule,MatSelectModule], 
      providers:[
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: usuario, },
        { provide: MatDialogRef, useFactory:()=>jasmine.createSpyObj('MatDialogRef',['close','afterClosed'])},
        { provide: UsuarioService, useValue:createSpyFromClass(UsuarioService) },
        provideAnimationsAsync(),
        provideAnimationsAsync('noop')
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDialogComponent);
    usuarioService=TestBed.inject<any>(UsuarioService);
    formBuilder=TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.usuarioForm=formBuilder.group({
      nombre:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      roles:[rolesV,[Validators.required]]
    });
    usuarioService.getRoles.and.nextWith(roles);
    usuarioService.getRolUsuario.and.nextWith(roles);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('cambiaRoles',()=>{
    let event={
        value:[1,2]
    };
    component.cambiaRoles(event);
    expect(usuario.roles?.length).toBe(2);
  });
  it('datosUsuario',()=>{
    component.datosUsuario();
    expect(component.usuario.name).toBe('nombre');
  });
  it('cerrar',()=>{
    spyOn(component,'cerrar').and.callThrough();
    component.cerrar();
    expect(component.cerrar).toHaveBeenCalled();
  });
});
