import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageProductoComponent } from './settings-page.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { CatalogoService } from '../../services/catalogo.service';
import { ProductoService } from '../../services/producto.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { of } from 'rxjs';

describe('SettingsPageComponent', () => {
  let component: SettingsPageProductoComponent;
  let fixture: ComponentFixture<SettingsPageProductoComponent>;
  let catalogoService:Spy<CatalogoService>;
  let productoService:Spy<ProductoService>;
  let catalogos:Catalogo[]=[{id:'1',name:'name',url:'url'},{id:'2',name:'name',url:'url'}];
  let productos:Producto[]=[{id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}];
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsPageProductoComponent,MockNavComponent,MockTablaProdComponent],
      imports:[RouterModule.forRoot([])],
      providers:[
        { provide: CatalogoService, useValue: createSpyFromClass(CatalogoService) },
        { provide: ProductoService, useValue: createSpyFromClass(ProductoService) },
        {provide: ActivatedRoute,useValue:{params:of({catalogo:'name'})}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPageProductoComponent);
    productoService=TestBed.inject<any>(ProductoService);
    catalogoService=TestBed.inject<any>(CatalogoService);
    component = fixture.componentInstance;
    catalogoService.getElements.and.nextWith(catalogos);
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