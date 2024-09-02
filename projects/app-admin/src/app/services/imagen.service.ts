import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  public ocultarModal=true;
  public tipo:'usuario'|'producto'|'catalogo'='usuario';
  public id:string='';
  public img:string='';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get ocultar(){
    return this.ocultarModal;
  }

  public abrirModal(tipo:'usuario'|'producto'|'catalogo',id:string,img:string){
    this.ocultarModal=false;
    this.tipo=tipo;
    this.id=id;
    this.img=img;
  }

  public cerrarModal(){
    this.ocultarModal=true;
  }


  public revisaTipoImagen(imagen:string){
    if(imagen){
      let url;
      try{
        url=new URL(imagen);
        return true;
      }catch(e){
        return false;
      }
    }
    return false;
  }

}
