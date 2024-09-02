import { Component, OnInit } from '@angular/core';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { concatMap, forkJoin, map, merge, switchMap, tap } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { CatalogoService } from '../../services/catalogo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-producto-page',
  templateUrl: './home-page-producto.component.html',
  styleUrl: './home-page-producto.component.css'
})
export class HomePageProductoComponent implements OnInit{

  public catalogos:Catalogo[]=[];
  public productos:Producto[]=[];
  public pxp:Producto[][];
  public productosCarro:Producto[]=[];

  constructor(private catalogoService:CatalogoService,private productoService:ProductoService,private router:Router){
    this.pxp=[];
    const nav=this.router.getCurrentNavigation();
    if(nav){
      if(nav.extras.state){
        const state=nav.extras.state as {
          productos:Producto[]
        };
        this.productosCarro=state.productos;
      }
    }
  }
  
  
  ngOnInit(): void {
    this.catalogoService.getElements().pipe(tap(catalogos=>this.catalogos=catalogos),
      switchMap((catalogos)=>catalogos.map(catalogo=>this.productoService.getProductosByCatalogo(catalogo.id,0,5))),
      concatMap(productos=>merge(productos))
    )
    .subscribe(resp=>{
      this.productos=this.productos.concat(resp);
      const indexCat=this.catalogos.findIndex(catalogo=>catalogo.id===resp[0].idCatalogo);
      this.pxp[indexCat]=resp;
    });
  }

}
