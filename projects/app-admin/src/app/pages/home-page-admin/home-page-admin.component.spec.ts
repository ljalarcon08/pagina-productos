import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageAdminComponent } from './home-page-admin.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

describe('HomePageComponent', () => {
  let component: HomePageAdminComponent;
  let fixture: ComponentFixture<HomePageAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageAdminComponent,MockNavComponent,MockImagenModal],
      providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageAdminComponent);
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
@Component({
  selector: 'app-imagen-modal',
  template: ''
})
class MockImagenModal {
}