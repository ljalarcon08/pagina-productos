import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageAdminComponent } from './settings-page.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Rol } from '../../../../../lib-auth/src/lib/models/rol';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('SettingsPageComponent', () => {
  let component: SettingsPageAdminComponent;
  let fixture: ComponentFixture<SettingsPageAdminComponent>;
  let usuarioService:Spy<UsuarioService>;
  let roles:Rol[]=[{id:1,name:'name'},{id:2,name:'name'}];
  let rol:Rol={id:1,name:'name'};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatTableModule,MatCardModule,MatPaginatorModule,MatIconModule],
      declarations: [SettingsPageAdminComponent,MockNavComponent],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
        ,{ provide: UsuarioService, useValue: createSpyFromClass(UsuarioService) },
        provideAnimationsAsync(),
        provideAnimationsAsync('noop')]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPageAdminComponent);
    usuarioService=TestBed.inject<any>(UsuarioService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component.libService,'tieneRol').and.returnValue(true);
    usuarioService.getRoles.and.nextWith(roles);
    expect(component).toBeTruthy();
  });
  it('actualizarRol',()=>{
    spyOn(component.dialog,'open').and
    .returnValue({
      afterClosed: ()=>of(rol)
    } as MatDialogRef<typeof component>);
    usuarioService.actualizarRol.and.nextWith(rol);
    usuarioService.getRoles.and.nextWith(roles);
    spyOn(component.libService,'tieneRol').and.returnValue(true);
    component.actualizarRol(rol);
    fixture.detectChanges();
    component.swal.clickConfirm();
    expect(component.roles.length).toBe(2);
  });
  it('eliminarRol',(done)=>{
    component.roles=roles;
    usuarioService.eliminiarRol.and.nextWith('ok');
    const cant=component.roles.length;
    component.eliminarRol(rol);
    fixture.detectChanges();
    expect(component.swal.isVisible()).toBeTruthy();
    component.swal.clickConfirm();
    setTimeout(() => {
      expect(component.roles.length).toBeGreaterThan(0);
      done();
    });
  });
  it('crearRol',()=>{
    spyOn(component.dialog,'open').and
    .returnValue({
      afterClosed: ()=>of(rol)
    } as MatDialogRef<typeof component>);
    usuarioService.crearRol.and.nextWith(rol);
    usuarioService.getRoles.and.nextWith(roles);
    spyOn(component.libService,'tieneRol').and.returnValue(true);
    component.crearRol();
    fixture.detectChanges();
    component.swal.clickConfirm();
    expect(component.roles.length).toBe(2);
  });
});
@Component({
  selector: 'app-nav',
  template: ''
})
class MockNavComponent {

}