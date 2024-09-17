import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProdComponent } from './tabla-prod.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LibAuthService, MonedaPipe } from '../../../../../lib-auth/src/public-api';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { ImagenService } from '../../../../../app-admin/src/app/services/imagen.service';
import { CarroService } from '../../services/carro.service';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { ProductoService } from '../../services/producto.service';
import { from, of, Subscription } from 'rxjs';
import { Carro } from '../../../../../lib-auth/src/lib/models/carro';
import { NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, TemplateRef } from '@angular/core';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

describe('TablaProdComponent', () => {
  let component: TablaProdComponent;
  let fixture: ComponentFixture<TablaProdComponent>;
  let imagenService:Spy<ImagenService>;
  let carroService:Spy<CarroService>;
  let productoService:Spy<ProductoService>;
  let formBuilder:FormBuilder;
  let carro:Carro={email:'email',id:'id',productos:[
    {id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}
  ]};
  let productos:Producto[]=[{id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}];
  let producto:Producto={id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1};
  let catalogos:Catalogo[]=[{id:'1',name:'name',url:'url'},{id:'2',name:'name',url:'url'}];
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaProdComponent,MockCarroProductoComponent],
      imports:[FormsModule,ReactiveFormsModule,MatCardModule,MonedaPipe,MatFormFieldModule,MatInputModule,RouterModule.forRoot([])],
      providers:[
        {provide:CarroService,useValue:createSpyFromClass(CarroService)}
        ,{provide:ImagenService,useValue:createSpyFromClass(ImagenService)}
        ,{provide:ProductoService,useValue:createSpyFromClass(ProductoService)}
        ,provideHttpClient(),provideHttpClientTesting(),JwtHelperService
      ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },provideAnimationsAsync(),
      provideAnimationsAsync('noop')
      ],
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaProdComponent);
    component = fixture.componentInstance;
    imagenService=TestBed.inject<any>(ImagenService);
    carroService=TestBed.inject<any>(CarroService);
    productoService=TestBed.inject<any>(ProductoService);
    formBuilder=TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    component.buscarForm=formBuilder.group({
      texto:['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('guardaCarro',()=>{
    const carr=Object.assign({},carro);
    spyOn(component.libService,'getToken').and.returnValue('token');
    spyOn(component.libService,'getEmail').and.returnValue('email');
    carroService.getCarroEmail.and.nextWith(carr);
    carroService.actualizarElement.and.nextWith(carr);
    component.productoCarro=productos;
    component.libService.cambioToken.emit('ok');
    expect(component.productoCarro.length).toBe(2);
  });
  it('guardaCarro2',()=>{
    const carr=Object.assign({},carro);
    const prods=Object.assign([],productos);
    prods.push({id:'3',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1});
    spyOn(component.libService,'getToken').and.returnValue('token');
    spyOn(component.libService,'getEmail').and.returnValue('email');
    carroService.getCarroEmail.and.nextWith(carr);
    carroService.actualizarElement.and.nextWith(carr);
    component.productoCarro=productos;
    component.libService.cambioToken.emit('ok');
    expect(component.productoCarro.length).toBe(2);
  });
  it('guardaCarro3',()=>{
    const carr=new Carro('email');
    const prods=Object.assign([],productos);
    prods.push({id:'3',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1});
    spyOn(component.libService,'getToken').and.returnValue('token');
    spyOn(component.libService,'getEmail').and.returnValue('email');
    carroService.getCarroEmail.and.nextWith(carr);
    carroService.crearElement.and.nextWith(carro);
    component.productoCarro=productos;
    component.libService.cambioToken.emit('ok');
    expect(component.productoCarro.length).toBe(2);
  });
  it('revisaTipoImagen',()=>{
    const estado=component.revisaTipoImagen('http://img.jpg');
    expect(estado).toBe(true);
  });
  it('abrir',()=>{
    component.abrir(component.templateRef,productos[0]);
    fixture.detectChanges();
    component.offCanvas.close(productos);
    expect(component.productoCarro.length).toBe(productos.length);
  });
  it('agregarProductoCarro',()=>{
    component.productoCarro=[];
    const prod=Object.assign({},producto);
    component.agregarProductoCarro(producto);
    expect(component.productoCarro.length).toBe(1);
  });
  it('agregarProductoCarro1',()=>{
    const prods=Object.assign([],productos);
    const prod=Object.assign({},producto);
    component.productoCarro=prods;
    component.agregarProductoCarro(prod);
    expect(component.productoCarro.length).toBe(2);
  });
  it('agregarProductoCarro2',()=>{
    const prods=Object.assign([],productos);
    let prod=Object.assign({},producto);
    prod.id='3';
    component.productoCarro=prods;
    component.agregarProductoCarro(prod);
    expect(component.productoCarro.length).toBe(3);
  });
  it('cerrar',()=>{
    spyOn(component,'cerrar').and.callThrough();
    component.cerrar();
    expect(component.cerrar).toHaveBeenCalled();
  });
  it('navegar',()=>{
    spyOn(router,'navigate').and.returnValue(Promise.resolve(true));
    const cats=Object.assign([],catalogos);
    const prods=Object.assign([],productos);
    component.productoCarro=prods;
    component.catalogos=cats;
    component.navegar('catalogo',0);
    expect(router.navigate).toHaveBeenCalled();
  });
  it('navegar2',()=>{
    spyOn(router,'navigate').and.returnValue(Promise.resolve(true));
    const cats=Object.assign([],catalogos);
    const prods=Object.assign([],productos);
    component.productoCarro=prods;
    component.catalogos=cats;
    component.navegar('',0);
    expect(router.navigate).toHaveBeenCalled();
  });
  it('buscar',()=>{
    component.buscarForm.patchValue({texto:'text'});
    productoService.getProductosByName.and.nextWith(productos);
    component.buscar();
    expect(component.productos.length).toBe(1);
  });
  it('buscar2',()=>{
    const cats=Object.assign([],catalogos);
    component.catalogosAnt=cats;
    const prods=Object.assign([],productos);
    productoService.getProductosByCatalogo.and.nextWithPerCall(prods);
    component.buscarForm.patchValue({texto:null});
    fixture.detectChanges();
    component.buscar();
    fixture.detectChanges();
    expect(component.productos.length).toBe(2);
  });
  it('limpiarBusqueda',()=>{
    const cats=Object.assign([],catalogos);
    component.catalogosAnt=cats;
    component.catalogos=[];
    const prods=Object.assign([],productos);
    productoService.getProductosByCatalogo.and.nextWithPerCall(prods);
    component.limpiarBusqueda();
    expect(component.catalogos.length).toBe(2);
  });
});
@Component({
  selector: 'app-carro-producto',
  template: ''
})
class MockCarroProductoComponent {
  @Input() productoCarro:Producto[]=[];
  @Input() offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype;
  @Input() producto:Producto=Producto.prototype;
}