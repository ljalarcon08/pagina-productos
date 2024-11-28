import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenModalComponent } from './imagen-modal.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ImagenService } from '../../services/imagen.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { UsuarioService } from '../../services/usuario.service';
import { ProductoService } from '../../services/producto.service';
import { CatalogoService } from '../../services/catalogo.service';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';


describe('ImagenModalComponent', () => {
  let component: ImagenModalComponent;
  let fixture: ComponentFixture<ImagenModalComponent>;
  let imagenService:Spy<ImagenService>;
  let usuarioService:Spy<UsuarioService>;
  let productoService:Spy<ProductoService>;
  let catalogoService:Spy<CatalogoService>;
  let usuario:Usuario={id:1,name:'nombre',email:'email',imagen:''};  
  let producto:Producto={id:'id',name:'name',idCatalogo:'id',img:'img',marca:'marca',prize:1,cantidad:0};
  let catalogo:Catalogo={id:'cat',name:'name',url:'url'};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagenModalComponent],
      imports:[FormsModule],
      providers:[
        {provide:ImagenService,useValue:createSpyFromClass(ImagenService)},
        {provide:UsuarioService,useValue:createSpyFromClass(UsuarioService)},
        {provide:ProductoService,useValue:createSpyFromClass(ProductoService)},
        {provide:CatalogoService,useValue:createSpyFromClass(CatalogoService)}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenModalComponent);
    imagenService=TestBed.inject<any>(ImagenService);
    usuarioService=TestBed.inject<any>(UsuarioService);
    productoService=TestBed.inject<any>(ProductoService);
    catalogoService=TestBed.inject<any>(CatalogoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('cerrarModal',()=>{
    component.cerrarModal();
    expect(component.imgTemp).toBeNull();
  });
  it('revisarImagen',()=>{
    imagenService.revisaTipoImagen.and.returnValue(true);
    component.imgCheck='imagen';
    let event={
      target:{
        value:'imagen'
      }
    };
    component.revisarImagen(event);
    expect(component.imgTemp).toBe('imagen');
  });
  it('cambiarImagen',()=>{
    spyOn(component,'cambiarImagen').and.callThrough();
    component.cambiarImagen();
    expect(component.cambiarImagen).toHaveBeenCalled();
  });
  it('subirImagenUsuario',()=>{
    usuarioService.actualizaImagenUsuario.and.nextWith(usuario);
    spyOn(component,'cerrarModal').and.callThrough();
    imagenService.id='1';
    imagenService.tipo='usuario';
    component.subirImagen();
    fixture.detectChanges();
    component.swal.clickConfirm();
    fixture.detectChanges();
    expect(component.cerrarModal).toHaveBeenCalled();
  });
  it('subirImagenProducto',()=>{
    productoService.actualizaImagen.and.nextWith(producto);
    spyOn(component,'cerrarModal').and.callThrough();
    imagenService.id='1';
    imagenService.tipo='producto';
    component.subirImagen();
    fixture.detectChanges();
    component.swal.clickConfirm();
    fixture.detectChanges();
    expect(component.cerrarModal).toHaveBeenCalled();
  });
  it('subirImagenCatalogo',()=>{
    catalogoService.actualizarImagen.and.nextWith(catalogo);
    spyOn(component,'cerrarModal').and.callThrough();
    imagenService.id='1';
    imagenService.tipo='catalogo';
    component.subirImagen();
    fixture.detectChanges();
    component.swal.clickConfirm();
    fixture.detectChanges();
    expect(component.cerrarModal).toHaveBeenCalled();
  });
});
