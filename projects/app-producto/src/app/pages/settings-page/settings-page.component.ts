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
    const nav=this.router.getCurrentNavigation();
    if(nav){
      const state=nav.extras.state as {
        productos:Producto[]
      };
      this.productosCarro=state.productos;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({catalogo})=>{
      this.productosCatalogo(catalogo);
    });
  }

  private productosCatalogo(catalogo:string){
    this.catalogoService.getElements().pipe(switchMap(catalogos=>{
      const catalogoSel=catalogos.find(cat=>cat.name===catalogo);
      if(catalogoSel){
        this.catalogos.push(catalogoSel);
        return this.productoService.getProductosByCatalogo(catalogoSel.id,0,10);  
      }
      else{
        return of();
      }
    })).subscribe(resp=>{
      this.productos.push(resp);
    });
  }

}
