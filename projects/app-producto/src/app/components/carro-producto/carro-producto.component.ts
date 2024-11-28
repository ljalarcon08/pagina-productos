import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { ImagenService } from '../../../../../lib-auth/src/lib/services/imagen.service';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { Subscription } from 'rxjs';
import { CarroService } from '../../services/carro.service';
import { Carro } from '../../../../../lib-auth/src/lib/models/carro';

@Component({
  selector: 'app-carro-producto',
  templateUrl: './carro-producto.component.html',
  styleUrl: './carro-producto.component.css'
})
export class CarroProductoComponent implements OnChanges,OnInit{

  @Input() productoCarro:Producto[]=[];
  @Input() offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype;
  @Input() producto:Producto=Producto.prototype;
  public carro:Carro=Carro.prototype;
  

  constructor(public config:NgbOffcanvasConfig,public offcanvasService:NgbOffcanvas,public imagenService:ImagenService,
    public libService:LibAuthService,private carroService:CarroService){

  }

  ngOnInit(): void {
    if(this.libService.getToken()){
      this.cargarCarro();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['offCanvas']){
      this.offCanvas=changes['offCanvas'].currentValue;
    }
    if(changes['productoCarro']){
      this.productoCarro=changes['productoCarro'].currentValue;
    }
    if(changes['producto']){
      this.producto=changes['producto'].currentValue;
    }
  }

  public cargarCarro(){
    const email=this.libService.getEmail();
    this.carroService.getCarroEmail(email).subscribe(resp=>{
      this.carro=resp;
      if(resp && resp.productos && this.producto.id){
        this.productoCarro=this.carro.productos!;
        let productos=resp.productos;
        const index=productos.findIndex(prod=>prod.id===this.producto.id);
        if(index>-1){
          const cantidad=productos[index].cantidad!;
          productos[index].cantidad=cantidad+1;
        }else{
          this.producto.cantidad=1;
          productos.push(this.producto);
        }
        this.productoCarro=productos;
        this.carro.productos=this.productoCarro;
      }
      else{
        this.productoCarro=resp.productos!;
      }
    });
  }

  public disminuir(producto:Producto){
    if(producto.cantidad!-1<1){
      this.productoCarro=this.productoCarro.filter(prod=>prod.id!==producto.id);
    }
    else{
      producto.cantidad=producto.cantidad!-1;
    }
  }

  public aumentar(producto:Producto){
    producto.cantidad=producto.cantidad!+1;
  }

  public cerrar(){

    if(this.libService.getToken()){
      if(this.carro.id){
        this.actualizarCarro();
      }
      else{
        this.crearCarro();
      }
    }
    else{
      this.offCanvas.close(this.productoCarro);
    }
  }

  public actualizarCarro(){
    this.carro.productos=this.productoCarro;
    this.carroService.actualizarElement(this.carro,this.carro.id!).subscribe(resp=>{
      this.offCanvas.close(this.productoCarro);
    });
  }


  public crearCarro(){
    const email=this.libService.getEmail();
    let carro=new Carro(email,undefined,this.productoCarro);
    this.carroService.crearElement(carro).subscribe(resp=>{
      this.offCanvas.close(this.productoCarro);
    });
  }

}

