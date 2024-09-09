import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroProductoComponent } from './carro-producto.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';

describe('CarroProductoComponent', () => {
  let component: CarroProductoComponent;
  let fixture: ComponentFixture<CarroProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarroProductoComponent],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarroProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
