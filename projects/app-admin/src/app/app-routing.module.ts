import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageAdminComponent } from './pages/home-page-admin/home-page-admin.component';
import { SettingsPageAdminComponent } from './pages/settings-page/settings-page.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';

const routes: Routes = [
    {path:'admin',redirectTo:'home'},
    {path:'admin/home',component:HomePageAdminComponent},
    {path:'admin/settings',component:SettingsPageAdminComponent},
    {path:'admin/producto',component:ProductoComponent},
    {path:'admin/catalogo',component:CatalogoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
