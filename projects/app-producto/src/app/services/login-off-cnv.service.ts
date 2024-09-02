import { Injectable } from '@angular/core';
import { Usuario } from '../../../../lib-auth/src/lib/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class LoginOffCnvService {

  public ocultarOffCanvas=true;
  public usuario:Usuario=new Usuario(1,'','','');

  constructor() { }


  public abrirCanvas(usuario:Usuario){
    this.ocultarOffCanvas=false;
    this.usuario=usuario;
  }

  public cerrarCanvas(){
    this.ocultarOffCanvas=true;
    this.usuario=new Usuario(1,'','','');
  }
}
