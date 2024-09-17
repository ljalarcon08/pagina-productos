import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Rol } from '../../../../../lib-auth/src/lib/models/rol';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RolDialogComponent } from '../../components/rol-dialog/rol-dialog.component';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';

@Component({
  selector: 'app-settings-admin-page',
  templateUrl: './settings-page.component.html',
  styleUrls:['../../../styles.css','./settings-page.component.css']
})
export class SettingsPageAdminComponent implements OnInit{

  public roles:Rol[]=[];

  public pageSize = 10;
  public pageSizeOptions = [10, 50, 100];
  public displayedColumns = ['id', 'name','actualizar','eliminar'];
  public totalReg=10;
  public paginaActual=0;
  public rolAdmin=false;
  public cambiaToken:Subscription=Subscription.EMPTY;
  public swal:any;

  @ViewChild(MatPaginator,{static:true}) 
  public paginator: MatPaginator=new MatPaginator(new MatPaginatorIntl(),ChangeDetectorRef.prototype);
  public dataSource: MatTableDataSource<any>=new MatTableDataSource();

  constructor(private usuarioService:UsuarioService,public dialog:MatDialog,public libService:LibAuthService){
    this.swal=Swal;
  }
  ngOnInit(): void {
    this.cargaRoles();
    this.cambiaToken=this.libService.cambioToken.subscribe(resp=>{
      if(resp){
        this.cargaRoles();
      }
    });
  }

  private cargaRoles(){
    this.rolAdmin=this.libService.tieneRol('ROLE_ADMIN');
    if(this.rolAdmin){
      this.usuarioService.getRoles().subscribe(resp=>{
        this.roles=resp;
        this.totalReg=this.roles.length;
        this.dataSource=new MatTableDataSource(this.roles);
        this.dataSource.paginator=this.paginator;
      });
    }
  }

  public actualizarRol(rol:Rol){
    let rolAct={...rol};
    const dialog=this.dialog.open(RolDialogComponent,{data:rolAct});

    dialog.afterClosed().subscribe(rol=>{
      if(rol){
        this.usuarioService.actualizarRol(rol).subscribe(resp=>{
          this.swal.fire('Actualizar Rol','Rol actualizado correctamente','success');
          this.cargaRoles();
        });
      }
    });
  }

  public eliminarRol(rol:Rol){
    Swal.fire({
      text:`Eliminar rol ${rol.name}?`,
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
        this.usuarioService.eliminiarRol(rol.id).subscribe(resp=>{  
          this.swal.fire('Eliminado','Usuario eliminado correctamente', 'success');
          this.roles=this.roles.filter(r=>r.id!=rol.id);
          this.dataSource.data=this.roles;
        });
        
      }
    });
  }

  public crearRol(){
    let rol=new Rol(NaN,'');
    const dialog=this.dialog.open(RolDialogComponent,{data:rol});

    dialog.afterClosed().subscribe(rol=>{
      if(rol){
        rol.id=null;
        this.usuarioService.crearRol(rol).subscribe(resp=>{
          this.cargaRoles();
          this.swal.fire('Crear Rol','Rol creado correctamente','success');
        });
      }
    });
  }

}
