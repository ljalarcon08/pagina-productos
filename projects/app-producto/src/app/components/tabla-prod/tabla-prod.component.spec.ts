import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaProdComponent } from './tabla-prod.component';

describe('TablaProdComponent', () => {
  let component: TablaProdComponent;
  let fixture: ComponentFixture<TablaProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablaProdComponent]
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
