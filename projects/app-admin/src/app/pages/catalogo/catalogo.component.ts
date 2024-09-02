import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CatalogoService } from '../../services/catalogo.service';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CatalogoDialogComponent } from '../../components/catalogo-dialog/catalogo-dialog.component';
import Swal from 'sweetalert2';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls:['../../../styles.css','./catalogo.component.css']
})
export class CatalogoComponent implements OnInit,OnDestroy{

  public catalogos:Catalogo[]=[];

  @ViewChild(MatPaginator,{static:true}) 
  public paginator: MatPaginator=new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  public dataSource: MatTableDataSource<any>=new MatTableDataSource();

  public pageSize = 10;
  public pageSizeOptions = [10, 50, 100];
  public displayedColumns = ['url','name','actualizar','eliminar'];
  public totalReg=10;
  public paginaActual=0;
  public imgSubs: Subscription=Subscription.EMPTY;
  public rolAdmin=false;
  public cambiaToken:Subscription=Subscription.EMPTY;

  constructor(private catalogoService:CatalogoService,private dialog:MatDialog,public imagenService:ImagenService,
    public libService:LibAuthService){

  }

  ngOnInit(): void {
    this.cargaCatalogos();
    this.cambiaToken=this.libService.cambioToken.subscribe(resp=>{
      if(resp){
        this.cargaCatalogos();
      }
    });
    this.imgSubs=this.imagenService.nuevaImagen.subscribe(img=>this.cargaCatalogos());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  private cargaCatalogos(){
    this.rolAdmin=this.libService.tieneRol('ROLE_ADMIN');
    if(this.rolAdmin){
      this.catalogoService.getElements().subscribe(resp=>{
        this.catalogos=resp;
        this.dataSource=new MatTableDataSource(this.catalogos);
        this.totalReg=this.catalogos.length;
        this.dataSource.paginator=this.paginator;
      });
    }
  }

  public crearCatalogo(){
    let catalogo=new Catalogo('','','');
    const dialog=this.dialog.open(CatalogoDialogComponent,{data:catalogo});

    dialog.afterClosed().subscribe(catalogo=>{
      if(catalogo){
        catalogo.id=null;
        this.catalogoService.crearElement(catalogo).subscribe(resp=>{
          this.cargaCatalogos();
          Swal.fire('Crear catalogo',`catalogo ${catalogo.name} creado correctamente`,'success');
        });
      }
    });

  }

  public actualizarCatalogo(catalogo:Catalogo){
    let catalogoAct={...catalogo};
    const dialog=this.dialog.open(CatalogoDialogComponent,{data:catalogoAct});

    dialog.afterClosed().subscribe(cat=>{
      if(cat){
        this.catalogoService.actualizarElement(cat,cat.id).subscribe(resp=>{
          this.cargaCatalogos();
          Swal.fire('Actualizar catalogo',`Catalogo ${cat.name} actualizado correctamente`,'success');
        });
      }
    });
  }

  public eliminarCatalogo(catalogo:Catalogo){

    Swal.fire({
      text:`Eliminar rol ${catalogo.name}?`,
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
        this.catalogoService.eliminarElement(catalogo.id).subscribe(resp=>{  
          Swal.fire('Eliminado','Catalogo eliminado correctamente', 'success');
          this.catalogos=this.catalogos.filter(r=>r.id!=catalogo.id);
          this.dataSource.data=this.catalogos;
        });
        
      }
    });


  }

  public abrirModal(catalogo:Catalogo){
    this.imagenService.abrirModal('catalogo',catalogo.id,catalogo.url);
  }
}
