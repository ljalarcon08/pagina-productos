import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { Rol } from '../../../../lib-auth/src/lib/models/rol';
import { Usuario } from '../../../../lib-auth/src/lib/models/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL_USUARIO:string='http://localhost:8090/api/usuario';

  constructor(private http:HttpClient,private libService:LibAuthService) {

   }

   public getUsuarioById(idUsuario:number){
    return this.http.get(`${this.URL_USUARIO}/${idUsuario}`,this.libService.getHeader());
   }

   public getUsuarioByEmail(email:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.URL_USUARIO}/email/${email}`,this.libService.getHeader());
   }

   public getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.URL_USUARIO}`,this.libService.getHeader());
   }

   public getPaginaUsuarios(pagina:number,largo:number){
    return this.http.get(`${this.URL_USUARIO}/page?pagina=${pagina}&largo=${largo}`,this.libService.getHeader());
   }

   public getRolUsuario(idUsuario:number):Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.URL_USUARIO}/rol/${idUsuario}`,this.libService.getHeader());
   }

   public getRolesById(id:number){
    return this.http.get(`${this.URL_USUARIO}/rol/${id}`,this.libService.getHeader());
   }

   public getRoles():Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.URL_USUARIO}/rol`,this.libService.getHeader());
   }

   public crearRol(rol:Rol):Observable<Rol>{
    return this.http.post<Rol>(`${this.URL_USUARIO}/rol`,rol,this.libService.getHeader());
   }

   public actualizarUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.URL_USUARIO}/actualizar/${usuario.id}`,usuario,this.libService.getHeader());
   }

   public actualizaImagenUsuario(id:number,imagen:string){
    return this.http.put(`${this.URL_USUARIO}/actualizarImagen/${id}`,{imagen},this.libService.getHeader());
   }

   public actualizarRol(rol:Rol){
    return this.http.put(`${this.URL_USUARIO}/rol/actualizar/${rol.id}`,rol,this.libService.getHeader());
   }

   public eliminarUsuario(id:number){
    return this.http.delete(`${this.URL_USUARIO}/eliminar/${id}`,this.libService.getHeader());
   }

   public eliminiarRol(id:number){
    return this.http.delete(`${this.URL_USUARIO}/rol/eliminar/${id}`,this.libService.getHeader());
   }

}
