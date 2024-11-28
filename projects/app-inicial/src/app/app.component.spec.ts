import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { LibAuthService } from '../../../lib-auth/src/public-api';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { MatSidenavModule } from '@angular/material/sidenav';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Component, Input } from '@angular/core';
import { Usuario } from '../../../lib-auth/src/lib/models/usuario';

describe('AppComponent', () => {

  let libServiceS:LibAuthService;
  let libAuthServiceMock:jasmine.SpyObj<LibAuthService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),MatSidenavModule,MatToolbarModule,MatIconModule,MatListModule
      ],
      declarations: [
        AppComponent,NavComponent,MockLoginComponent]
      ,providers:[provideHttpClient(),provideHttpClientTesting(),JwtHelperService
        ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
        ,{provide:libServiceS,useValue:libAuthServiceMock},provideAnimationsAsync(),provideAnimationsAsync('noop')]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});


@Component({
  selector: 'app-login',
  template: ''
})
class MockLoginComponent {

  @Input() usuario:Usuario=new Usuario(1,'','','');
}