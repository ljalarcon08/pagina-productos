import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { Producto } from '../../../../lib-auth/src/lib/models/producto';
import { GenericService } from '../../../../lib-auth/src/lib/services/generic.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends GenericService<Producto>{

  private URLL:string='http://localhost:8090/api/producto/producto';

  constructor(private httpC:HttpClient,private libService:LibAuthService) { 
    super(httpC,libService,'http://localhost:8090/api/producto/producto');
  }


  public getPaginaProducto(pagina:number,largo:number){
    return this.httpC.get(`${this.URLL}/pagina?pagina=${pagina}&largo=${largo}`,this.libService.getHeader());
  }

  public actualizaImagen(id:string,img:string){
    return this.httpC.put(`${this.URLL}/imagen/${id}`,{img},this.libService.getHeader());
  }

}
