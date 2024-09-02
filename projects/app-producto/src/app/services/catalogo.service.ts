import { Injectable } from '@angular/core';
import { GenericService } from '../../../../lib-auth/src/lib/services/generic.service';
import { Catalogo } from '../../../../lib-auth/src/lib/models/catalogo';
import { HttpClient } from '@angular/common/http';
import { LibAuthService } from '../../../../lib-auth/src/public-api';

@Injectable({
  providedIn: 'root'
})
export class CatalogoService extends GenericService<Catalogo>{

  URLC:string='http://localhost:8090/api/producto/catalogo';

  constructor(private httpC:HttpClient,private libService:LibAuthService) { 
    super(httpC,libService,'http://localhost:8090/api/producto/catalogo');
  }


  public actualizarImagen(id:string,url:string){
    return this.httpC.put(`${this.URLC}/imagen/${id}`,{img:url},this.libService.getHeader());
  }
}
