import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDialogComponent } from './producto-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CatalogoService } from '../../services/catalogo.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { MatSelectModule } from '@angular/material/select';

describe('ProductoDialogComponent', () => {
  let component: ProductoDialogComponent;
  let fixture: ComponentFixture<ProductoDialogComponent>;
  let formBuilder:FormBuilder;
  let producto:Producto={id:'id',name:'name',idCatalogo:'id',img:'img',marca:'marca',prize:1,cantidad:0};
  let cat:Catalogo={id:'id',name:'name',url:'url'};
  let catalogos:Catalogo[]=[];

  beforeEach(async () => {
    catalogos.push(cat);
    await TestBed.configureTestingModule({
      declarations: [ProductoDialogComponent],
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,MatInputModule,MatSelectModule], 
      providers:[{ provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {producto,catalogos}, },
        { provide: MatDialogRef, useFactory:()=>jasmine.createSpyObj('MatDialogRef',['close','afterClosed'])}
        ,provideAnimationsAsync(),
      provideAnimationsAsync('noop')]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoDialogComponent);
    component = fixture.componentInstance;
    formBuilder=TestBed.inject(FormBuilder);
    component.productoForm=formBuilder.group({
      nombre:['nombre',[Validators.required]],
      precio:[0,[Validators.required,Validators.min(100)]],
      marca:['marca',[Validators.required]],
      catalogo:['id',[Validators.required]]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('datosProducto',()=>{
    const producto:Producto=component.datosProducto();
    expect(producto.id).toBe('id');
  });
  it('cerrar',()=>{
    spyOn(component,'cerrar').and.callThrough();
    component.cerrar();
    expect(component.cerrar).toHaveBeenCalled();
  });
});
