import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibAuthComponent } from './lib-auth.component';

describe('LibAuthComponent', () => {
  let component: LibAuthComponent;
  let fixture: ComponentFixture<LibAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LibAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
