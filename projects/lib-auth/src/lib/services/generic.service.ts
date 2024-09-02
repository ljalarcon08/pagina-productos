import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibAuthService } from '../lib-auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T> {

  private URL:string='';

  constructor(private http:HttpClient,private libAuthService:LibAuthService,private urlIn:string) {
    this.URL=urlIn;
   }

  public getElements():Observable<T[]>{
    return this.http.get<T[]>(`${this.URL}`);
  }

  public getElementById(id:string):Observable<T>{
    return this.http.get<T>(`${this.URL}/${id}`);
  }

  public crearElement(element:T):Observable<T>{
    return this.http.post<T>(`${this.URL}`,element,this.libAuthService.getHeader());
  }

  public actualizarElement(element:T,id:string):Observable<T>{
    return this.http.put<T>(`${this.URL}/${id}`,element,this.libAuthService.getHeader());
  }

  public eliminarElement(id:string){
    return this.http.delete(`${this.URL}/${id}`,this.libAuthService.getHeader());
  }
}
