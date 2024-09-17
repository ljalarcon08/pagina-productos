import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoComponent } from './catalogo.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { ImagenService } from '../../services/imagen.service';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { CatalogoDialogComponent } from '../../components/catalogo-dialog/catalogo-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';

describe('CatalogoComponent', () => {
  let component: CatalogoComponent;
  let fixture: ComponentFixture<CatalogoComponent>;
  let catalogoService:Spy<CatalogoService>;
  let catalogo:Catalogo={id:'1',name:'name',url:'url'};
  let catalogos:Catalogo[]=[{id:'1',name:'name',url:'url'},{id:'2',name:'name',url:'url'}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatTableModule],
      declarations: [CatalogoComponent,MockNavComponent,MockImagenModal,CatalogoDialogComponent],
      providers:[
        { provide: CatalogoService, useValue: createSpyFromClass(CatalogoService) },
        LibAuthService,
        provideHttpClient(),provideHttpClientTesting(),JwtHelperService
      ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoComponent);
    catalogoService=TestBed.inject<any>(CatalogoService);
    catalogoService.getElements.and.nextWith(catalogos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('creaCatalogo', () => {
    spyOn(component.dialog,'open').and
    .returnValue({
      afterClosed: ()=>of(catalogo)
    } as MatDialogRef<typeof component>);
    catalogoService.crearElement.and.nextWith(catalogo);
    spyOn(component.libService,'tieneRol').and.returnValue(true);
    component.crearCatalogo();
    fixture.detectChanges();
    component.swal.clickConfirm();
    expect(component.totalReg).toBe(2);
  });
  it('actualizarCatalogo',()=>{
    spyOn(component.dialog,'open').and
    .returnValue({
      afterClosed: ()=>of(catalogo)
    } as MatDialogRef<typeof component>);
    catalogoService.actualizarElement.and.nextWith(catalogo);
    spyOn(component.libService,'tieneRol').and.returnValue(true);
    component.actualizarCatalogo(catalogo);
    fixture.detectChanges();
    component.swal.clickConfirm();
    expect(component.totalReg).toBe(2);
  });
  it('eliminarCatalogo',(done)=>{
    component.catalogos=catalogos;
    catalogoService.eliminarElement.and.nextWith('ok');
    const cant=component.catalogos.length;
    const cat={id:'1',name:'name',url:'url'}
    component.eliminarCatalogo(cat);
    expect(component.swal.isVisible()).toBeTruthy();
    component.swal.clickConfirm();
    setTimeout(() => {
      expect(component.catalogos.length).toBe(cant-1);
      done();
    });
  });
  it('abrirModal',()=>{
    spyOn(component,'abrirModal').and.callThrough();
    component.abrirModal(catalogo);
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