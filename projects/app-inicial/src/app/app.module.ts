import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavComponent } from './components/nav/nav.component';
import { LibAuthModule } from '../../../lib-auth/src/public-api';
import { NgbModule, NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActualizaUsuarioComponent } from './components/actualiza-usuario/actualiza-usuario.component';
import { ImagenModalComponent } from './components/imagen-modal/imagen-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    InicioSesionComponent,
    ActualizaUsuarioComponent,
    ImagenModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NoopAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    LibAuthModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideAnimationsAsync('noop'),
    NgbOffcanvasConfig, NgbOffcanvas
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
