import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-settings-producto-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageProductoComponent implements OnInit{

  public productos:Producto[][];
  public catalogos:Catalogo[]=[];
  public productosCarro:Producto[]=[];


  constructor(private activatedRoute:ActivatedRoute,private productoService:ProductoService,private catalogoService:CatalogoService,private router:Router){
    this.productos=[];
    console.log('constructor°°°°');
    const nav=this.router.getCurrentNavigation();
    if(nav){
      console.log(nav.extras);
      const state=nav.extras.state as {
        productos:Producto[]
      };
      this.productosCarro=state.productos;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({catalogo})=>{
      console.log(catalogo);
      this.productosCatalogo(catalogo);
    });
  }

  private productosCatalogo(catalogo:string){
    this.catalogoService.getElements().pipe(switchMap(catalogos=>{
      console.log('switchmap');
      const catalogoSel=catalogos.find(cat=>cat.name===catalogo);
      if(catalogoSel){
        console.log(catalogoSel);
        this.catalogos.push(catalogoSel);
        return this.productoService.getProductosByCatalogo(catalogoSel.id,0,10);  
      }
      else{
        console.log('noooo');
        return of();
      }
    })).subscribe(resp=>{
      this.productos.push(resp);
      console.log(this.productos)
    });
  }


  public cargaProductos(event:any){
    console.log(event);
  }

}
