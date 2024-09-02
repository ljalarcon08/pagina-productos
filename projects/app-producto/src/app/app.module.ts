import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageProductoComponent } from './pages/home-page-producto/home-page-producto.component';
import { NavComponent } from './components/nav/nav.component';
import { SettingsPageProductoComponent } from './pages/settings-page/settings-page.component';
import { CommonModule } from '@angular/common';
import { TablaProdComponent } from './components/tabla-prod/tabla-prod.component';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardModule, MatCardTitle } from '@angular/material/card';
import { LibAuthModule, MonedaPipe } from '../../../lib-auth/src/public-api';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { CarroProductoComponent } from './components/carro-producto/carro-producto.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const providers:[]=[];

@NgModule({
  declarations: [
    AppComponent,
    HomePageProductoComponent,
    NavComponent,
    SettingsPageProductoComponent,
    TablaProdComponent,
    CarroProductoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatCardContent,
    MatCardActions,
    MatCardTitle,
    MatCardHeader,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatAccordion,
    MatExpansionModule,
    MatIconModule,
    LibAuthModule,
    MonedaPipe,
    ReactiveFormsModule
  ],
  providers:[],
  bootstrap: [AppComponent]
})
export class AppModule { }

@NgModule({})
export class ProductoSharedModule{
  static forRoot():ModuleWithProviders<any>{
    return{
      ngModule:AppModule,providers
    }
  }
}
