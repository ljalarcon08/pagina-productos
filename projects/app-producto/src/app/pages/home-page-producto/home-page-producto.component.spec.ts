import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageProductoComponent } from './home-page-producto.component';
import { RouterModule } from '@angular/router';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';

describe('HomePageComponent', () => {
  let component: HomePageProductoComponent;
  let fixture: ComponentFixture<HomePageProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageProductoComponent,MockNavComponent,MockTablaProdComponent],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageProductoComponent);
    component = fixture.componentInstance;
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