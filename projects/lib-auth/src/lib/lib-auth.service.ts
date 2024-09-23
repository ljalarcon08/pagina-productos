import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './models/usuario';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LibAuthService {


  public URL:string='http://localhost:8090/auth';
  public email:string='';
  public decoder:JwtHelperService=new JwtHelperService();
  public cambioToken: EventEmitter<string> = new EventEmitter<string>();

  constructor(private http:HttpClient,private jwtHelper: JwtHelperService) { }

  public getHeader(){
    return {
      headers:{
        Authorization:`Bearer ${this.getToken()}`
      }
    }
   }

  public login(username:string,password:string){
    return this.http.post(`${this.URL}/login`,{username,password})
      .pipe(tap((resp:any)=>{
        localStorage.setItem('token',resp.jwt);
        this.email=username;
        this.cambioToken.emit('true');
      }
    ));
  }


  public checkToken():Observable<any>{
    return this.http.get<any>(`${this.URL}/checkToken`,this.getHeader());
  }

  public getEmail(){
    if(this.getToken()){
      const token:string=this.getToken()!;
      const decodeTk=this.jwtHelper.decodeToken(token);
      return decodeTk.sub;
    }
    return '';
  }

 public signUp(usuario:any):Observable<Usuario>{
   usuario.id=null;
   return this.http.post<Usuario>(`${this.URL}/signup`,usuario);
 }

public logout(){
  return this.http.get(`${this.URL}/logout`,this.getHeader());
}

 public getToken(){
  return localStorage.getItem('token');
 }

 public quitarToken(){
  localStorage.removeItem('token');
  this.cambioToken.emit('true');
 }

 public tieneRol(rol:string):boolean{
  const token=this.getToken();
  if(token){
    const decodedToken=this.decoder.decodeToken(token);
    return decodedToken.roles.includes(rol);
  }
  return false;
 }


}
