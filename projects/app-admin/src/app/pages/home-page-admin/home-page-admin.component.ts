import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2'
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from '../../components/usuario-dialog/usuario-dialog.component';
import { ImagenService } from '../../services/imagen.service';
import { Subscription } from 'rxjs';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';

@Component({
  selector: 'app-home-admin-page',
  templateUrl: './home-page-admin.component.html',
  styleUrls:['../../../styles.css','./home-page-admin.component.css']
})
export class HomePageAdminComponent implements OnInit,OnDestroy{

  public usuarios:Usuario[]=[];

  public pageSize = 10;
  public pageSizeOptions = [10, 50, 100];
  public displayedColumns = ['imagen', 'name', 'email', 'google','actualizar','eliminar'];
  public totalReg=10;
  public paginaActual=0;
  public imgSubs: Subscription=Subscription.EMPTY;
  private cambioToken:Subscription=Subscription.EMPTY;
  public rolAdmin=false;

  @ViewChild(MatPaginator,{static:true}) 
  public paginator: MatPaginator=new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  public dataSource: MatTableDataSource<any>=new MatTableDataSource();
  public swal:any;



  constructor(private usuarioService:UsuarioService,public dialog:MatDialog,public imagenService:ImagenService,public libService:LibAuthService){
    this.swal=Swal;
  }

  ngOnInit(): void {     
    this.iniciar();
    this.imgSubs=this.imagenService.nuevaImagen.subscribe(img=>this.cargarPagina(this.paginaActual,this.pageSize));
    
    this.cambioToken=this.libService.checkCambioToken$.subscribe(resp=>{
      if(resp){
        this.iniciar();
      }
    });
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
    this.cambioToken.unsubscribe();
  }


  public iniciar(){
    this.rolAdmin=this.libService.tieneRol('ROLE_ADMIN');
    if(this.rolAdmin){
      this.cargarPagina(0,this.pageSize);    
      this.dataSource.paginator=this.paginator;
    }
  }

  public cargarPagina(pagina:number,largo:number){
    this.usuarioService.getPaginaUsuarios(pagina,largo).subscribe((resp:any)=>{
      this.usuarios=resp.usuarios;
      this.dataSource=new MatTableDataSource(this.usuarios);
      this.totalReg=resp.totalRegistros;
    });
  }

  public cambiaPagina(evento:any){
    this.paginaActual=evento.pageIndex;
    this.pageSize=evento.pageSize;
    this.cargarPagina(evento.pageIndex,evento.pageSize);
  }


  public actualizarUsuario(usuario:Usuario){
    let usuarioC={...usuario};
    const dialog=this.dialog.open(UsuarioDialogComponent,{data:usuarioC});

    dialog.afterClosed().subscribe(usuario=>{
      if(usuario){
        this.usuarioService.actualizarUsuario(usuario).subscribe(resp=>{
          this.swal.fire('Actualizacion','Usuario actualizado correctamente','success');
          this.cargarPagina(this.paginaActual,this.pageSize);
        });
      }
    });
  } 

  public eliminarUsuario(usuario:Usuario){

    this.swal.fire({
      text:`Eliminar usuario ${usuario.name}?`,
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2',
        denyButton: 'order-3',
        title:'popTitle'
      },
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(usuario.id).subscribe(resp=>{
          this.swal.fire('Eliminado','Usuario eliminado correctamente', 'success');
          this.usuarios=this.usuarios.filter(u=>u.id!=usuario.id);
          this.dataSource.data=this.usuarios;
        });
        
      }
    });
  }

  public abrirModal(usuario:Usuario){
    this.imagenService.abrirModal('usuario',usuario.id+'',usuario.imagen);
  }

}
