import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { NgbOffcanvas, NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent implements OnChanges{

  public submitF=false;
  usuario:Usuario=new Usuario(1,'','','');
  @Input() offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype; 
  public registrar=false;

  public loginForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  });

  public signUpForm=this.formBuilder.group({
    nombre:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
  },{validators:this.revisarPasswords('password','password2')} as AbstractControlOptions);

  constructor(private formBuilder:FormBuilder,private usuarioService:UsuarioService,private libAuthService:LibAuthService){

  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['offCanvas']){
      this.offCanvas=changes['offCanvas'].currentValue;
    }
  }



  public login(){
    this.submitF=true;
    if(!this.loginForm.invalid){
      const email:any=this.loginForm.get('email')?.value;
      this.usuario.email=email;
      const password:any=this.loginForm.get('password')?.value;

      this.libAuthService.login(email,password)
      .pipe(switchMap(resp=>this.usuarioService.getUsuarioByEmail(email))) 
      .subscribe(resp=>{
        this.usuario=resp[0];
        Swal.fire('Sesion','Sesión iniciada correctamente','success');
        this.cerrar();
      });
    }
  }


  public campoError(campo:string,formGroup:FormGroup):boolean{
    if(formGroup.get(campo)?.invalid && this.submitF){
      return true;
    }
    return false;
  }


  public cerrar(){
    this.submitF=false;
    this.offCanvas.close(this.usuario);
  }



  public abrirRegistrar(){
    this.registrar=true;
    
  }

  public revisarPasswords(pass1:string,pass2:string){
    return(formGroup:FormGroup)=>{
      const pass1Control = formGroup.get(pass1)!;
      const pass2Control = formGroup.get(pass2)!;
      if ( pass1Control.value! === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }

  public signUp(){
    this.submitF=true;
    if(!this.signUpForm.invalid){
      const name:any=this.signUpForm.get('nombre')!.value;
      const email:any=this.signUpForm.get('email')!.value;
      const password:any=this.signUpForm.get('password')!.value;
      const usuario=new Usuario(1,name,email,'',password,false);
      this.libAuthService.signUp(usuario).subscribe(resp=>{
        this.usuario=resp;
        Swal.fire('Estado Registro','Registro creado exitosamente','success');
        this.submitF=false;
        this.offCanvas.close();
      });
    }
  }
}
