import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageAdminComponent } from './pages/home-page-admin/home-page-admin.component';
import { SettingsPageAdminComponent } from './pages/settings-page/settings-page.component';
import { NavComponent } from './components/nav/nav/nav.component';
import { LibAuthModule, MonedaPipe } from '../../../lib-auth/src/public-api';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ImagenModalComponent } from './components/imagen-modal/imagen-modal.component';
import { ImagenModalModule } from './components/imagen-modal/imagen-modal.module';
import { RolDialogComponent } from './components/rol-dialog/rol-dialog.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoDialogComponent } from './components/producto-dialog/producto-dialog.component';
import { BuscaCatalogoPipe } from './pipes/busca-catalogo.pipe';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { CatalogoDialogComponent } from './components/catalogo-dialog/catalogo-dialog.component';

const providers:[]=[];

@NgModule({
  declarations: [
    AppComponent,
    HomePageAdminComponent,
    SettingsPageAdminComponent,
    NavComponent,
    UsuarioDialogComponent,
    RolDialogComponent,
    ProductoComponent,
    ProductoDialogComponent,
    BuscaCatalogoPipe,
    CatalogoComponent,
    CatalogoDialogComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatIconModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatCardSubtitle,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormField,
    MatSelectModule,
    MatPaginator,
    MatTableModule,
    LibAuthModule,
    ReactiveFormsModule,
    ImagenModalModule,MonedaPipe
  ],
  providers,
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class AdminSharedModule{

  static forRoot():ModuleWithProviders<any>{
    return {
      ngModule:AppModule,providers
    }
  }
}