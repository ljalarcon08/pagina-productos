import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageProductoComponent } from './home-page-producto.component';

describe('HomePageComponent', () => {
  let component: HomePageProductoComponent;
  let fixture: ComponentFixture<HomePageProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageProductoComponent]
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
