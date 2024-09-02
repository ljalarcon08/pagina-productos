import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { concatMap, from, merge, mergeMap, of, pipe, Subscription, switchMap } from 'rxjs';
import { CarroService } from '../../services/carro.service';
import { Carro } from '../../../../../lib-auth/src/lib/models/carro';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-tabla-prod',
  templateUrl: './tabla-prod.component.html',
  styleUrl: './tabla-prod.component.css'
})
export class TablaProdComponent implements OnChanges,OnInit,OnDestroy{


  
  @Input() productoCarro:Producto[]=[];
  @Input() productos:Producto[][];
  @Input() catalogos:Catalogo[]=[];
  @Input() isCatPage:boolean=false;
  public offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype;
  public productoSeleccionado:Producto=Producto.prototype;
  public cambiaToken:Subscription=Subscription.EMPTY;
  public loginOk=false;
  public buscarForm=this.formBuilder.group({
    texto:['']
  });
  catalogosAnt:Catalogo[]=[];
  buscando:boolean=false;
  
  constructor(public config:NgbOffcanvasConfig,public offcanvasService:NgbOffcanvas,
    private libService:LibAuthService,private carroService:CarroService,private router:Router,private formBuilder:FormBuilder,private productoService:ProductoService
  ){
    this.productos=[];
    config.backdrop='static';
  }

  ngOnInit(): void {
    this.cambiaToken=this.libService.cambioToken.subscribe(resp=>{
      console.log('cambia TOK tabla prod');
      if(resp){
        if(this.libService.getToken()){
          this.loginOk=true;
          this.guardarCarro();
        }else{
          this.loginOk=false;
          this.productoCarro=[];
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['productoCarro']){
      this.productoCarro=changes['productoCarro'].currentValue;
    }
    if(changes['productos']){
      this.productos=changes['productos'].currentValue;
      console.log(this.productos);
    }
    if(changes['catalogos']){
      this.catalogos=changes['catalogos'].currentValue;
      this.catalogosAnt=[...this.catalogos];
      console.log(this.catalogos);
    }
    if(changes['isCatPage']){
      this.isCatPage=changes['isCatPage'].currentValue;
    }
  }

  ngOnDestroy(): void {
    console.log('on destroy');
    this.cambiaToken.unsubscribe();
  }

  public guardarCarro(){
    if(this.productoCarro.length>0){
      this.cargaCarro();
    }
  }

  public cargaCarro(){
    const email=this.libService.getEmail();
    console.log('cargaCarro');
    this.carroService.getCarroEmail(email)
    .pipe(switchMap(carro=>{
      if(carro && carro.productos){
        return this.actualizaCarro(carro);
      }
      else{
        return this.creaCarro(carro,email);
      }
    }))
    .subscribe(resp=>{
      this.productoCarro=resp.productos!;
    });
  }

  public actualizaCarro(carro:Carro){
    let productoSav=carro.productos!;
    console.log(carro.productos);  
    console.log(this.productoCarro);
    this.productoCarro.forEach(producto=>{
      let index=productoSav.findIndex(prod=>producto.id===prod.id);
      console.log(index);
      if(index>-1){
        console.log('index');
        let cantidad=productoSav[index].cantidad!;
        productoSav[index].cantidad=cantidad+1;
      }
      else{
        console.log('no index');
        productoSav.push(producto);
      }
    });
    carro.productos=productoSav;
    return this.carroService.actualizarElement(carro,carro.id!);
  }

  public creaCarro(carro:Carro,email:string){
    carro=new Carro(email,undefined,this.productoCarro);
    return this.carroService.crearElement(carro);
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


  public abrir(content: TemplateRef<any>,producto:Producto) {
    this.productoSeleccionado=producto;
    console.log(content);
    this.agregarProductoCarro(producto);
		this.offCanvas=this.offcanvasService.open(content);
    this.offCanvas.closed.subscribe(resp=>{
      console.log('respuesta cierre canvas');
      console.log(resp);
      if(resp){
        console.log(resp);
        this.productoCarro=resp;
      }
      else{
        console.log('sin datos');
      }
    });
  }

  public agregarProductoCarro(producto:Producto){
    if(this.productoCarro.length==0){
      producto.cantidad=1;
      this.productoCarro.push(producto);
    }else{
      const index=this.productoCarro.findIndex(prod=>prod.id==producto.id);
      if(index!==-1){
        let cantidad=this.productoCarro[index].cantidad!;
        this.productoCarro[index].cantidad=cantidad+1;
      }
      else{
        producto.cantidad=1;
        this.productoCarro.push(producto);
      }
    }
  }

  public cerrar(){
    console.log('cerrar');
    this.offCanvas.dismiss();
  }


  public navegar(direccion:string,index:number){
    const extra:NavigationExtras={state:{productos:this.productoCarro}};
    if(direccion==='catalogo'){
      this.router.navigate(['/producto/settings/',this.catalogos[index].name],extra);
    }
    else{
      this.router.navigate(['/producto/home'],extra);
    }
    
  }


  public buscar(){
    console.log('buscar');
    const textoControl=this.buscarForm.get('texto');
    if(textoControl){
      const textoBuscado=textoControl.value;
      if(textoBuscado){
        console.log(textoBuscado);
        this.cargarProductoPorNombre(textoBuscado);
      }
      else{
        this.catalogos=this.catalogosAnt;      
        this.cargaProductosPorCatalogo();
      }

    } 
  }

  public limpiarBusqueda(){
    this.catalogos=this.catalogosAnt;  
    this.buscarForm.patchValue({texto:''});
    this.cargaProductosPorCatalogo();
  }

  public cargarProductoPorNombre(textoBuscado:string){
        this.productoService.getProductosByName(textoBuscado).subscribe(resp=>{
              const listaProd:Producto[][]=[];
              listaProd.push(resp);
              this.productos=listaProd;
              const listaCat:Catalogo[]=[];
              const catalogo=new Catalogo('','Producto Buscado','');
              listaCat.push(catalogo);
              this.catalogos=listaCat;
        });
  }

  public cargaProductosPorCatalogo(){
    this.productos=[];
    of(this.catalogosAnt).pipe(
      switchMap(catalogos=>catalogos.map(catalogo=>this.productoService.getProductosByCatalogo(catalogo.id,0,5)))
      ,concatMap(productos=>merge(productos))
    ).subscribe(resp=>{
      this.productos.push(resp);}
    );
  }

}
