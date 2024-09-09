import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import { ImagenService } from '../../../../../lib-auth/src/lib/services/imagen.service';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import Swal from 'sweetalert2';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit,OnChanges{

  @Input() usuario:Usuario=new Usuario(1,'','','');
  public submitF=false;
  public actDatos=false;
  public loginOk=false;
  public offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype;
  public changeImg:Subscription=Subscription.EMPTY;
  

  constructor(public config:NgbOffcanvasConfig,public offcanvasService:NgbOffcanvas,public imagenService:ImagenService,
    private libAuthService:LibAuthService,private usuarioService:UsuarioService){
		config.position = 'end';
		config.keyboard = false;
    config.scroll=true;
  }


  ngOnInit(): void {
    if(this.libAuthService.getToken()){
      const email=this.libAuthService.getEmail();
      this.libAuthService.checkToken()
      .pipe(switchMap(resp=>{
        if(resp.valid){
          return this.usuarioService.getUsuarioByEmail(email);
        }
        else{
          this.libAuthService.quitarToken();
          this.loginOk=false;
          return of();
        }
      }),catchError(error=>{
        this.libAuthService.quitarToken();
        return of();
      }))
      .subscribe(users=>{
        if(users){
          this.usuario=users[0];
          this.loginOk=true;
        }
        else{
          this.loginOk=false;
        }
      });

    }
    this.changeImg=this.imagenService.nuevaImagen.subscribe(img=>{
      this.cargaUsuario();
    });
  }

  public cargaUsuario(){
    if(this.libAuthService.getToken()){
      const email=this.libAuthService.getEmail();
      this.usuarioService.getUsuarioByEmail(email).subscribe(resp=>{
        this.usuario=resp[0];
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.usuario=changes['usuario'].currentValue;
    if(this.libAuthService.getToken() && this.usuario.email){
      this.loginOk=true;
    }
  }


	public abrir(content: TemplateRef<any>) {
    this.actDatos=false;
		this.offCanvas=this.offcanvasService.open(content);
    this.offCanvas.closed.subscribe(resp=>{
      if(resp){
        this.usuario=resp;
        this.loginOk=true;
      }
      else{
        this.usuario=new Usuario(1,'','','');
        this.loginOk=false;
      }
    });
  }

  public cerrar(){
    this.submitF=false;
    this.actDatos=false;
    this.offCanvas.dismiss();
  }

  public actualizarDatos(content: TemplateRef<any>) {
    this.actDatos=true;
    this.loginOk=true;
		this.offCanvas=this.offcanvasService.open(content);
    this.offCanvas.closed.subscribe(resp=>{
      this.usuario=new Usuario(1,'','','');
      this.loginOk=false;
    });
  }

  public abrirModal(usuario:Usuario){
    this.imagenService.abrirModal('usuario',usuario.id+'',usuario.imagen);
  }

  public cerrarSesion(){
    Swal.fire({
      text:`¿Desea cerrar sesion?`,
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
        this.loginOk=false;
        this.libAuthService.logout().subscribe(resp=>{
          this.libAuthService.quitarToken();
        });        
      }
    });
  }
}
