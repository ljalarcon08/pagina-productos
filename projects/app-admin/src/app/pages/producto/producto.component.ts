import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../../services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoDialogComponent } from '../../components/producto-dialog/producto-dialog.component';
import Swal from 'sweetalert2';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { ImagenService } from '../../services/imagen.service';
import { delay, Subscription } from 'rxjs';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls:['../../../styles.css','./producto.component.css']
})
export class ProductoComponent implements OnInit,OnDestroy{
  public productos:Producto[]=[];

  public pageSize = 10;
  public pageSizeOptions = [10, 50, 100];
  public displayedColumns = ['img', 'name', 'prize','marca','catalogo','actualizar','eliminar'];
  public totalReg=10;
  public paginaActual=0;
  public catalogos:Catalogo[]=[];
  public imgSubs: Subscription=Subscription.EMPTY;
  public rolAdmin=false;
  public cambiaToken:Subscription=Subscription.EMPTY;

  @ViewChild(MatPaginator,{static:true})
  public paginator:MatPaginator=new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  public datasource:MatTableDataSource<any>=new MatTableDataSource();

  constructor(private productoService:ProductoService,private dialog:MatDialog,private catalogoService:CatalogoService,
    public imagenService:ImagenService,public libService:LibAuthService){
  }

  ngOnInit(): void {
    this.iniciar();
    this.cambiaToken=this.libService.cambioToken.subscribe(resp=>{
      if(resp){
        this.iniciar();
      }
    });
    this.imgSubs = this.imagenService.nuevaImagen
    .pipe(delay(100))
    .subscribe( img => this.cargaPagina(this.paginaActual,this.pageSize) );
  }

  ngOnDestroy(): void {
    this.cambiaToken.unsubscribe();
    this.imgSubs.unsubscribe();
  }

  private iniciar(){
    this.rolAdmin=this.libService.tieneRol('ROLE_ADMIN');
    if(this.rolAdmin){
      this.catalogoService.getElements().subscribe(resp=>this.catalogos=resp);
      this.cargaPagina(0,this.pageSize);
      this.datasource.paginator=this.paginator;
    }
  }

  private cargaPagina(nroPagina:number,largo:number){
    this.productoService.getPaginaProducto(nroPagina,largo).subscribe((resp:any)=>{
      this.datasource=new MatTableDataSource(resp.productos);
      this.totalReg=resp.totalRegistros;
    });
  }

  public cambiaPagina(evento:any){
    this.paginaActual=evento.pageIndex;
    this.pageSize=evento.pageSize;
    this.cargaPagina(evento.pageIndex,evento.pageSize);
  }

  public crearProducto(){
    let producto=new Producto('','','',1,'','');

    const dialog=this.dialog.open(ProductoDialogComponent,{data:{producto,catalogos:this.catalogos}});

    dialog.afterClosed().subscribe(producto=>{
      if(producto){
        producto.id=null;
        this.productoService.crearElement(producto).subscribe(resp=>{
          this.productos.push(resp);
          this.totalReg=this.totalReg+1;
          Swal.fire('Crear Producto','Producto creado exitosamente','success');
          this.cargaPagina(this.paginaActual,this.pageSize);
        });
      }
    });
  }

  public actualizarProducto(producto:Producto){
    let productoAct={...producto};
    const dialog=this.dialog.open(ProductoDialogComponent,{data:{producto:productoAct,catalogos:this.catalogos}});

    dialog.afterClosed().subscribe(producto=>{
      if(producto){
        this.productoService.actualizarElement(producto,producto.id).subscribe(resp=>{
          Swal.fire('Actualizar Producto','Producto actualizado exitosamente','success');
          this.cargaPagina(this.paginaActual,this.pageSize);
        });
      }
    });
  }

  public eliminarProducto(producto:Producto){
    Swal.fire({
      text:`Eliminar producto ${producto.name}?`,
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2',
        denyButton: 'order-3',
        title:'popTitle'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.eliminarElement(producto.id).subscribe(resp=>{  
          Swal.fire('Eliminado','Usuario eliminado correctamente', 'success');
          this.productos=this.productos.filter(p=>p.id!=producto.id);
          this.datasource.data=this.productos;
          this.cargaPagina(this.paginaActual,this.pageSize);
        }); 
      }
    });
  }


  public abrirModal(producto:Producto){
    this.imagenService.abrirModal('producto',producto.id,producto.img);
  }
}
