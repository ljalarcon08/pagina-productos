import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizaUsuarioComponent } from './actualiza-usuario.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Component, Input } from '@angular/core';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';

describe('ActualizaUsuarioComponent', () => {
  let component: ActualizaUsuarioComponent;
  let fixture: ComponentFixture<ActualizaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizaUsuarioComponent],
      imports:[FormsModule,ReactiveFormsModule],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },UsuarioService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});