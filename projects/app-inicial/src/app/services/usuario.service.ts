import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { Observable } from 'rxjs';
import { Usuario } from '../../../../lib-auth/src/lib/models/usuario';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL_USUARIO:string=`${environment.serverUrl}/api/usuario`;

  constructor(private http:HttpClient,private libService:LibAuthService) {

   }

   public getUsuarioByEmail(email:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.URL_USUARIO}/email/${email}`,this.libService.getHeader());
   }

   public actualizarUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.URL_USUARIO}/actualizar/${usuario.id}`,usuario,this.libService.getHeader());
   }

   public actualizaImagenUsuario(id:number,imagen:string){
    return this.http.put(`${this.URL_USUARIO}/actualizarImagen/${id}`,{imagen},this.libService.getHeader());
   }
}
