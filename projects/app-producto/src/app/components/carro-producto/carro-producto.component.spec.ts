import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroProductoComponent } from './carro-producto.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { ImagenService } from '../../../../../app-admin/src/app/services/imagen.service';
import { CarroService } from '../../services/carro.service';
import { Carro } from '../../../../../lib-auth/src/lib/models/carro';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';

describe('CarroProductoComponent', () => {
  let component: CarroProductoComponent;
  let fixture: ComponentFixture<CarroProductoComponent>;
  let libService:Spy<LibAuthService>;
  let imagenService:Spy<ImagenService>;
  let carroService:Spy<CarroService>;
  let carro:Carro={email:'email',id:'id',productos:[
    {id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}
  ]};
  let producto:Producto={id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1};
  let productos=[{id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarroProductoComponent],
      providers:[NgbOffcanvasConfig,NgbOffcanvas,
        {provide:LibAuthService,useValue:createSpyFromClass(LibAuthService)}
        ,{provide:CarroService,useValue:createSpyFromClass(CarroService)}
        ,{provide:ImagenService,useValue:createSpyFromClass(ImagenService)}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarroProductoComponent);
    component = fixture.componentInstance;
    libService=TestBed.inject<any>(LibAuthService);
    imagenService=TestBed.inject<any>(ImagenService);
    carroService=TestBed.inject<any>(CarroService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('cargarCarro',()=>{
    libService.getToken.and.returnValue('token');
    libService.getEmail.and.returnValue('email');
    carroService.getCarroEmail.and.nextWith(carro);
    component.cargarCarro();
    expect(component.productoCarro).not.toBeNull();
  });
  it('disminuir',()=>{
    component.productoCarro=productos.slice();
    producto.cantidad=1;
    component.disminuir(producto);
    expect(component.productoCarro.length).toBe(1);
  });
  it('disminuir2',()=>{
    component.productoCarro=productos.slice();
    producto.cantidad=2;
    component.disminuir(producto);
    expect(component.productoCarro.length).toBe(2);
  });
  it('aumentar',()=>{
    producto.cantidad=1;
    component.aumentar(producto);
    expect(producto.cantidad).toBe(2);
  });
  it('cerrar',()=>{
    libService.getToken.and.returnValue('token');
    spyOn(component,'actualizarCarro').and.callThrough();
    component.carro=carro;
    carroService.actualizarElement.and.nextWith(carro);
    component.cerrar();
    expect(component.actualizarCarro).toHaveBeenCalled();
  });
  it('cerrar2',()=>{
    libService.getToken.and.returnValue('token');
    spyOn(component,'crearCarro').and.callThrough();
    component.carro.id='';
    carroService.crearElement.and.nextWith(carro);
    libService.getEmail.and.returnValue('email');
    component.cerrar();
    expect(component.crearCarro).toHaveBeenCalled();
  });
});
