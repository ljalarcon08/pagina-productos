import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { Producto } from '../../../../lib-auth/src/lib/models/producto';
import { GenericService } from '../../../../lib-auth/src/lib/services/generic.service';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  URLL:string=`${environment.serverUrl}/api/producto/producto`;

  constructor(private httpC:HttpClient,private libService:LibAuthService) { 
    super(httpC,libService,`${environment.serverUrl}/api/producto/producto`);
  }


  public getPaginaProducto(pagina:number,largo:number){
    return this.httpC.get(`${this.URLL}/pagina?pagina=${pagina}&largo=${largo}`,this.libService.getHeader());
  }

  public actualizaImagen(id:string,img:string){
    return this.httpC.put(`${this.URLL}/imagen/${id}`,{img},this.libService.getHeader());
  }

}
