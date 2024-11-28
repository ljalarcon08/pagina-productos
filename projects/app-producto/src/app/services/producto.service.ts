import { Injectable } from '@angular/core';
import { GenericService } from '../../../../lib-auth/src/lib/services/generic.service';
import { Producto } from '../../../../lib-auth/src/lib/models/producto';
import { HttpClient } from '@angular/common/http';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { Observable } from 'rxjs';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  private URLL:string=`${environment.serverUrl}/api/producto/producto`;

  constructor(private httpC:HttpClient,private libService:LibAuthService) { 
    super(httpC,libService,`${environment.serverUrl}/api/producto/producto`);
  }

  public getPaginaProducto(pagina:number,largo:number){
    return this.httpC.get(`${this.URLL}/pagina?pagina=${pagina}&largo=${largo}`);
  }

  public getProductosByCatalogo(idCatalogo:string,pagina:number,largo:number):Observable<Producto[]>{
    return this.httpC.get<Producto[]>(`${this.URLL}/catalogo/${idCatalogo}?pagina=${pagina}&largo=${largo}`);
  }

  public actualizaImagen(id:string,img:string){
    return this.httpC.put(`${this.URLL}/imagen/${id}`,{img},this.libService.getHeader());
  }

  public getProductosByName(name:string){
    return this.httpC.get<Producto[]>(`${this.URLL}/nombre/${name}`);
  }
}