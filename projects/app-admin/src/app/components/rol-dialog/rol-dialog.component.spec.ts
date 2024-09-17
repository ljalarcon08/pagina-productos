import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolDialogComponent } from './rol-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Rol } from '../../../../../lib-auth/src/lib/models/rol';

describe('RolDialogComponent', () => {
  let component: RolDialogComponent;
  let fixture: ComponentFixture<RolDialogComponent>;
  let formBuilder:FormBuilder;
  let rol:Rol={id:1,name:'name'};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolDialogComponent],
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,MatInputModule], 
      providers:[
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: rol, },
        { provide: MatDialogRef, useFactory:()=>jasmine.createSpyObj('MatDialogRef',['close','afterClosed'])},
        provideAnimationsAsync(),
        provideAnimationsAsync('noop')]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolDialogComponent);
    formBuilder=TestBed.inject(FormBuilder);
    component = fixture.componentInstance;
    component.rolForm=formBuilder.group({
      nombre:['nombre',[Validators.required]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('cargaRol',()=>{
    const ron:Rol=component.cargarRol();
    expect(ron.name).toBe('name');
  });
  it('cerrar',()=>{
    spyOn(component,'cerrar').and.callThrough();
    component.cerrar();
    expect(component.cerrar).toHaveBeenCalled();
  });
});
