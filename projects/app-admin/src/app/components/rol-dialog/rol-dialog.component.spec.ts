import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolDialogComponent } from './rol-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('RolDialogComponent', () => {
  let component: RolDialogComponent;
  let fixture: ComponentFixture<RolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RolDialogComponent],
      imports:[FormsModule,ReactiveFormsModule,MatFormFieldModule,MatDialogModule,MatInputModule], 
      providers:[{ provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: [] },
        provideHttpClient(),provideHttpClientTesting(),JwtHelperService
      ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS },provideAnimationsAsync(),
      provideAnimationsAsync('noop')]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
