import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageAdminComponent } from './settings-page.component';

describe('SettingsPageComponent', () => {
  let component: SettingsPageAdminComponent;
  let fixture: ComponentFixture<SettingsPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsPageAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsPageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
