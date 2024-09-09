import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenModalComponent } from './imagen-modal.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';


describe('ImagenModalComponent', () => {
  let component: ImagenModalComponent;
  let fixture: ComponentFixture<ImagenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagenModalComponent],
      imports:[FormsModule],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
