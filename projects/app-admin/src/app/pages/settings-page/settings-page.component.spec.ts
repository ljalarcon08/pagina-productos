import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPageAdminComponent } from './settings-page.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

describe('SettingsPageComponent', () => {
  let component: SettingsPageAdminComponent;
  let fixture: ComponentFixture<SettingsPageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsPageAdminComponent,MockNavComponent],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
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
@Component({
  selector: 'app-nav',
  template: ''
})
class MockNavComponent {

}