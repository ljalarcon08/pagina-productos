import { TestBed } from '@angular/core/testing';

import { ProductoService } from './producto.service';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Producto } from '../../../../lib-auth/src/lib/models/producto';


describe('ProductoService', () => {
  let service: ProductoService;
  let httpClientSpy:Spy<HttpClient>;
  let libService:Spy<LibAuthService>;
  let respProducto:any={
    productos:[{id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1},{id:'2',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1}],
    totalRegistros:2
  };
  let producto:Producto={id:'1',idCatalogo:'1',img:'img',marca:'marca',name:'name',prize:1,cantidad:1};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        {provide:LibAuthService,useValue:createSpyFromClass(LibAuthService)},
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });
    service = TestBed.inject(ProductoService);
    httpClientSpy=TestBed.inject<any>(HttpClient);
    libService=TestBed.inject<any>(LibAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getPaginaProducto',()=>{
    httpClientSpy.get.and.nextWith(respProducto);
    service.getPaginaProducto(0,5).subscribe((resp:any)=>{
      expect(resp.productos.length).toBe(2);
    });
  });
  it('getProductosByCatalogo',()=>{
    httpClientSpy.get.and.nextWith(respProducto.productos);
    service.getProductosByCatalogo('cat',1,1).subscribe(resp=>expect(resp.length).toBe(2));
  });
  it('actualizaImagen',()=>{
    httpClientSpy.put.and.nextWith(producto);
    service.actualizaImagen('id','img').subscribe((resp:any)=>expect(resp.id).toBe(producto.id));
  });
  it('getProductosByName',()=>{
    httpClientSpy.get.and.nextWith(respProducto.productos);
    service.getProductosByName('name').subscribe(resp=>expect(resp.length).toBe(2));
  });
});
