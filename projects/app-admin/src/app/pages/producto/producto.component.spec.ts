import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoComponent } from './producto.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProductoService } from '../../services/producto.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('ProductoComponent', () => {
  let component: ProductoComponent;
  let fixture: ComponentFixture<ProductoComponent>;
  let productoService:Spy<ProductoService>;
  let catalogoService:Spy<CatalogoService>;
  let producto:Producto={id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1};
  let respProducto:any={
    productos:[{id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}],
    totalRegistros:2
  };
  let catalogos:Catalogo[]=[{id:'1',name:'name',url:'url'},{id:'2',name:'name',url:'url'}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatTableModule],
      declarations: [ProductoComponent,MockNavComponent,MockImagenModal],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
        ,{provide:ProductoService,useValue:createSpyFromClass(ProductoService)}
        ,{provide:CatalogoService,useValue:createSpyFromClass(CatalogoService)}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoComponent);
    productoService=TestBed.inject<any>(ProductoService);
    catalogoService=TestBed.inject<any>(CatalogoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    catalogoService.getElements.and.nextWith(catalogos);
    spyOn(component.libService,'tieneRol').and.returnValue(true);
    productoService.getPaginaProducto.and.nextWith(respProducto);
    expect(component).toBeTruthy();
  });
  it('cambiaPagina',()=>{
    productoService.getPaginaProducto.and.nextWith(respProducto);
    const event={
      pageIndex:1,pageSize:10
    };
    component.cambiaPagina(event);
    expect(component.totalReg).toBe(2);
  });
  it('crearProducto',()=>{
    spyOn(component.dialog,'open').and
    .returnValue({
      afterClosed: ()=>of(producto)
    } as MatDialogRef<typeof component>);
    spyOn(component.libService,'tieneRol').and.returnValue(true);
    productoService.crearElement.and.nextWith(producto);
    productoService.getPaginaProducto.and.nextWith(respProducto);
    component.crearProducto();
    fixture.detectChanges();
    component.swal.clickConfirm();
    expect(component.totalReg).toBe(2);
  });
  it('actualizarProducto',()=>{
    spyOn(component.dialog,'open').and
    .returnValue({
      afterClosed: ()=>of(producto)
    } as MatDialogRef<typeof component>);
    productoService.actualizarElement.and.nextWith(producto);
    productoService.getPaginaProducto.and.nextWith(respProducto);
    component.actualizarProducto(producto);
    fixture.detectChanges();
    component.swal.clickConfirm();
    expect(component.totalReg).toBe(2);
  });
  it('eliminarProducto',(done)=>{
    component.productos=respProducto.productos;
    productoService.eliminarElement.and.nextWith('ok');
    productoService.getPaginaProducto.and.nextWith(respProducto);
    const cant=component.productos.length;
    component.eliminarProducto(producto);
    fixture.detectChanges();
    expect(component.swal.isVisible()).toBeTruthy();
    component.swal.clickConfirm();
    setTimeout(() => {
      expect(component.productos.length).toBeGreaterThan(0);
      done();
    });
  });
  it('abrirModal',()=>{
    spyOn(component,'abrirModal').and.callThrough();
    component.abrirModal(producto);
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