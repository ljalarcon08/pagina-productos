import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageProductoComponent } from './home-page-producto.component';
import { RouterModule } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { ProductoService } from '../../services/producto.service';
import { of } from 'rxjs';

describe('HomePageComponent', () => {
  let component: HomePageProductoComponent;
  let fixture: ComponentFixture<HomePageProductoComponent>;
  let catalogoService:Spy<CatalogoService>;
  let productoService:Spy<ProductoService>;
  let catalogos:Catalogo[]=[{id:'1',name:'name',url:'url'},{id:'2',name:'name',url:'url'}];
  let productos:Producto[]=[{id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}];


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterModule.forRoot([])],
      declarations: [HomePageProductoComponent,MockNavComponent,MockTablaProdComponent],
      providers:[
        { provide: CatalogoService, useValue: createSpyFromClass(CatalogoService) },
        { provide: ProductoService, useValue: createSpyFromClass(ProductoService) }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageProductoComponent);
    productoService=TestBed.inject<any>(ProductoService);
    catalogoService=TestBed.inject<any>(CatalogoService);

    component = fixture.componentInstance;

    catalogoService.getElements.and.returnValue(of(catalogos));
    const prods=Object.assign([],productos);
    productoService.getProductosByCatalogo.and.nextWithPerCall(prods);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'app-nav',
  template: ''
})
class MockNavComponent {

}
@Component({
  selector: 'app-tabla-prod',
  template: ''
})
class MockTablaProdComponent {
  @Input() productoCarro:Producto[]=[];
  @Input() productos:Producto[][]=[];
  @Input() catalogos:Catalogo[]=[];
  @Input() isCatPage:boolean=false;
}