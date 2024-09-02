import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageProductoComponent } from './pages/home-page-producto/home-page-producto.component';
import { SettingsPageProductoComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  {path:'producto/home',component:HomePageProductoComponent},
  {path:'producto/settings/:catalogo',component:SettingsPageProductoComponent},
  {path:'producto',pathMatch:'full',redirectTo:'producto/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
