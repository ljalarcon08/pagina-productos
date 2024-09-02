import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenModalComponent } from './imagen-modal.component';

describe('ImagenModalComponent', () => {
  let component: ImagenModalComponent;
  let fixture: ComponentFixture<ImagenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImagenModalComponent]
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
