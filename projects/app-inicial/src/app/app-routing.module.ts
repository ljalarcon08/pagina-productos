import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoSharedModule } from '../../../app-producto/src/app/app.module';
import { AdminSharedModule } from '../../../app-admin/src/app/app.module';

const routes: Routes = [
  {path:'producto',
    loadChildren:()=>import('../../../app-producto/src/app/app.module').then(n=>n.ProductoSharedModule)
   },
  {path:'',pathMatch:'full',redirectTo:'producto/home'},
  {path:'admin',loadChildren:()=>import('../../../app-admin/src/app/app.module').then(a=>a.AdminSharedModule)},
  {path:'**',redirectTo:'producto/home'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProductoSharedModule.forRoot(),
    AdminSharedModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
