import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageProductoComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageProductoComponent;
  let fixture: ComponentFixture<SettingsPageProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsPageProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPageProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
