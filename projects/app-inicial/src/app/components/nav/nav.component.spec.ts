import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NavComponent } from './nav.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { Component, EventEmitter, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { UsuarioService } from '../../services/usuario.service';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let event=new EventEmitter();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent,MockLoginComponent],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterModule.forRoot([])
      ],
      providers:[LibAuthService,
        provideHttpClient(),provideHttpClientTesting(),JwtHelperService
      ,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
@Component({
  selector: 'app-login',
  template: ''
})
class MockLoginComponent {

  @Input() usuario:Usuario=new Usuario(1,'','','');
}