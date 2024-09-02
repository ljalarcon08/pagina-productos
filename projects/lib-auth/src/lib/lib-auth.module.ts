import { NgModule } from '@angular/core';
import { LibAuthComponent } from './lib-auth.component';
import { provideHttpClient } from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    LibAuthComponent
  ],
  imports: [
    JwtModule
  ],
  exports: [
    LibAuthComponent
  ],
  providers:[provideHttpClient(),JwtHelperService,{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
})
export class LibAuthModule { }
