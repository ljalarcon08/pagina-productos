import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageAdminComponent } from './home-page-admin.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

import { MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../services/usuario.service';
import { MatDialogRef } from '@angular/material/dialog';
import { from, of } from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageAdminComponent;
  let fixture: ComponentFixture<HomePageAdminComponent>;
  let usuarioService:Spy<UsuarioService>;
  let usuario={id:1,name:'nombre',email:'email',imagen:''};
  let respUsuario={
    usuarios:[{id:1,name:'nombre',email:'email',imagen:''},{id:2,name:'nombre',email:'email',imagen:''}],
    totalRegistros:2
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatTableModule],
      declarations: [HomePageAdminComponent,MockNavComponent,MockImagenModal],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        { provide: UsuarioService, useValue: createSpyFromClass(UsuarioService) }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageAdminComponent);
    usuarioService=TestBed.inject<any>(UsuarioService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('iniciar',()=>{
    spyOn(component.libService,'tieneRol').and.returnValue(true);
    usuarioService.getPaginaUsuarios.and.nextWith(respUsuario);
    component.iniciar();
    expect(component.totalReg).toBe(2);
  });
  it('cambiaPagina',()=>{
    const event={
      pageIndex:1,pageSize:10
    };
    usuarioService.getPaginaUsuarios.and.nextWith(respUsuario);
    component.cambiaPagina(event);
    expect(component.totalReg).toBe(2);
  });
  it('actualizarUsuario',()=>{
    spyOn(component.dialog,'open').and
    .returnValue({
      afterClosed: ()=>of(usuario)
    } as MatDialogRef<typeof component>);
    usuarioService.actualizarUsuario.and.nextWith(usuario);
    usuarioService.getPaginaUsuarios.and.nextWith(respUsuario);
    usuarioService.getPaginaUsuarios.and.callFake(()=>{
      return from([respUsuario]);
    });
    component.actualizarUsuario(usuario);
    fixture.detectChanges();
    component.swal.clickConfirm();
    expect(component.totalReg).toBe(2);
  });
  it('eliminarUsuario',(done)=>{
    component.usuarios=respUsuario.usuarios;
    usuarioService.eliminarUsuario.and.nextWith('ok');
    component.eliminarUsuario(usuario);
    expect(component.swal.isVisible()).toBeTruthy();
    fixture.detectChanges();
    component.swal.clickConfirm();
    const cant=component.usuarios.length;
    setTimeout(() => {
      expect(component.usuarios.length).toBe(cant-1);
      done();
    });
  });
  it('abrirModal',()=>{
    spyOn(component,'abrirModal').and.callThrough();
    component.abrirModal(usuario);
    expect(component.abrirModal).toHaveBeenCalled();
  });
});
@Component({
  selector: 'app-nav',
  template: ''
})
class MockNavComponent {

}
@Component({
  selector: 'app-imagen-modal',
  template: ''
})
class MockImagenModal {
}