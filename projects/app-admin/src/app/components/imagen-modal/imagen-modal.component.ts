import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../../services/imagen.service';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { ProductoService } from '../../services/producto.service';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-imagen-modal',
  templateUrl: './imagen-modal.component.html',
  styleUrl: './imagen-modal.component.css',
})
export class ImagenModalComponent{

  public imagen:string='';
  public imgTemp:any=null;
  public imgCheck:string='';

  constructor(public imagenService:ImagenService,private usuarioService:UsuarioService,private productoService:ProductoService,private catalogoService:CatalogoService){
  }

  public cerrarModal(){
    this.imgTemp=null;
    this.imgCheck='';
    this.imagenService.cerrarModal();
  }

  public revisarImagen(event:any){
    console.log('revisarImagen');
    this.imgCheck=event.target.value;
    if(this.imagenService.revisaTipoImagen(event.target.value)){
      this.imgTemp=this.imgCheck;
      console.log(event.target.value);
    }
    else{
      event.target.value='';
    }
  }

  public cambiarImagen(){
    console.log('cambiarImagen');
    console.log(this.imgCheck);
    this.imgTemp=this.imgCheck;
    this.imagen=this.imgCheck;
    console.log(this.imagen);
  }

  public subirImagen(){
    console.log('subir imagen');
    console.log(this.imagen);
    const id=this.imagenService.id;
    const tipo=this.imagenService.tipo;
    switch(tipo){
      case 'usuario':
        this.actualizarImagenUsuario(Number(id));
        break;
      case 'producto':
        this.actualizarImagenProducto(id);
        break;
      case 'catalogo':
        this.actualizarImagenCatalogo(id);
        break;
      default:
        break;
    }
  }


  private actualizarImagenUsuario(id:number){
    this.usuarioService.actualizaImagenUsuario(id,this.imgCheck).subscribe(resp=>{
      this.respuestaCarga(resp);
    });
  }

  private actualizarImagenProducto(id:string){
    this.productoService.actualizaImagen(id,this.imgCheck).subscribe(resp=>{
      this.respuestaCarga(resp);
    });
  }

  private actualizarImagenCatalogo(id:string){
    this.catalogoService.actualizarImagen(id,this.imgCheck).subscribe(resp=>{
      this.respuestaCarga(resp);
    });
  }

  private respuestaCarga(resp:any){
    this.imagenService.nuevaImagen.emit(this.imagen);
    this.cerrarModal();
    Swal.fire('Actualizar Imagen','Imagen actualizada correctamente','success');
  }

}
