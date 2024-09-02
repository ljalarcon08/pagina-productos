import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { NgbOffcanvasRef } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualiza-usuario',
  templateUrl: './actualiza-usuario.component.html',
  styleUrl: './actualiza-usuario.component.css'
})
export class ActualizaUsuarioComponent implements OnChanges{

  @Input() usuario:Usuario=new Usuario(1,'','','');
  @Input() offCanvas:NgbOffcanvasRef=NgbOffcanvasRef.prototype; 
  public submitM=false;
  public cambioOk=false;


  public actualizarForm:FormGroup=this.formBuilder.group({
    nombre:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
  },{validators:this.revisarPasswords('password','password2')} as AbstractControlOptions);


  constructor(private formBuilder:FormBuilder,private usuarioService:UsuarioService){
    this.actualizarForm.controls['email'].disable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.usuario=changes['usuario'].currentValue;
    this.actualizarForm.patchValue({nombre:this.usuario.name});
    this.actualizarForm.patchValue({email:this.usuario.email});
    if(changes['offCanvas']){
      this.offCanvas=changes['offCanvas'].currentValue;
    }
  }

  public actualizarUsuario(){
    this.submitM=true;
    if(!this.actualizarForm.invalid){
      const name:string=this.actualizarForm.get('nombre')!.value;
      const email=this.actualizarForm.get('email')!.value;
      const password=this.actualizarForm.get('password')!.value;
      const usuarioAct=new Usuario(this.usuario.id,name,email,this.usuario.imagen,password,this.usuario.google);
      this.usuarioService.actualizarUsuario(usuarioAct).subscribe(resp=>{
        this.usuario=resp;
        this.cambioOk=true;
        this.cerrar();
        Swal.fire('Actualización Usuario','Cambios aplicados correctamente','success');
      });
    }
  }

  public campoError(campo:string):boolean{
    if(this.actualizarForm.get(campo)?.invalid && this.submitM){
      return true;
    }
    return false;
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

  public cerrar(){
    this.offCanvas.close(this.usuario);
  }
  
}
