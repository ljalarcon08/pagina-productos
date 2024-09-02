import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDialogComponent } from './catalogo-dialog.component';

describe('CatalogoDialogComponent', () => {
  let component: CatalogoDialogComponent;
  let fixture: ComponentFixture<CatalogoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
