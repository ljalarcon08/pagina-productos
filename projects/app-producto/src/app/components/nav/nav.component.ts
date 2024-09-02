import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { LoginOffCnvService } from '../../services/login-off-cnv.service';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { Subscription } from 'rxjs';

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

  constructor(public config:NgbOffcanvasConfig,public offcanvasService:NgbOffcanvas,private libService:LibAuthService){

  }

  ngOnInit(): void {
    if(this.libService.getToken()){
      this.logged=true;
    }

    
    this.cambiaToken=this.libService.cambioToken.subscribe(resp=>{
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
  }


  public abrirCarro(content: TemplateRef<any>){
    this.offCanvas=this.offcanvasService.open(content,{ backdrop: 'static' });
  }

}
