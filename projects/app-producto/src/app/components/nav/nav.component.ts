import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { LoginOffCnvService } from '../../services/login-off-cnv.service';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { Observable, of, Subscription } from 'rxjs';
import { CarroService } from '../../services/carro.service';
import { Carro } from '../../../../../lib-auth/src/lib/models/carro';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit,OnDestroy{

  public usuario:Usuario=new Usuario(1,'','','');
  public productoCarro:Producto[]=[];
  public offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype;
  public cambiaToken:Subscription=Subscription.EMPTY;
  public logged:boolean=false;
  public carroSubs:Subscription=Subscription.EMPTY;

  constructor(public config:NgbOffcanvasConfig,public offcanvasService:NgbOffcanvas,private libService:LibAuthService,private carroService:CarroService){

  }

  ngOnInit(): void {
    if(this.libService.getToken()){
      this.logged=true;
    }

    this.carroSubs=this.carroService.carro$.subscribe((carro)=>{
      if(carro.productos && carro.productos.length>=0){
        this.productoCarro=carro.productos;
      }
    });
    
    this.cambiaToken=this.libService.checkCambioToken$.subscribe(resp=>{
      if(resp){
        if(this.libService.getToken()){
          this.logged=true;
        }else{
          this.logged=false;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.cambiaToken.unsubscribe();
    this.carroSubs.unsubscribe();
  }


  public abrirCarro(content: TemplateRef<any>){
    this.offCanvas=this.offcanvasService.open(content,{ backdrop: 'static' });
  }

}
