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

describe('TablaProdComponent', () => {
  let component: TablaProdComponent;
  let fixture: ComponentFixture<TablaProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaProdComponent],
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule],
      providers:[provideAnimationsAsync(),provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
