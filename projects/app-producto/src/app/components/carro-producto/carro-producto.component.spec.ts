import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarroProductoComponent } from './carro-producto.component';

describe('CarroProductoComponent', () => {
  let component: CarroProductoComponent;
  let fixture: ComponentFixture<CarroProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarroProductoComponent]
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
