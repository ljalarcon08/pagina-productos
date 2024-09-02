import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { Rol } from '../../../../../lib-auth/src/lib/models/rol';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.css'
})
export class UsuarioDialogComponent implements OnInit{
    
  roles:Rol[]=[];
  selectedValues:Rol[]=[];
  rolesV:number[]=[];

  public usuarioForm=this.formBuilder.group({
    nombre:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    roles:[this.rolesV,[Validators.required]]
  });

  constructor(public dialog:MatDialogRef<UsuarioDialogComponent>,private usuarioService:UsuarioService,
    @Inject(MAT_DIALOG_DATA) public usuario:Usuario,private formBuilder:FormBuilder){
      
  }

  ngOnInit(): void {
    this.usuarioForm.patchValue({nombre:this.usuario.name});
    this.usuarioForm.patchValue({email:this.usuario.email});
    this.cargaRoles();
  }

  public cargaRoles(){
    this.usuarioService.getRoles().subscribe(resp=>{
      this.roles=resp;
      this.cargaRolesUsuario();
      console.log(resp);
    });
  }

  public cargaRolesUsuario(){
    this.usuarioService.getRolUsuario(this.usuario.id).subscribe(resp=>{
      this.usuario.roles=resp;
      let listaRoles:number[]=[];
      this.usuario.roles.forEach(rol=>listaRoles.push(rol.id));
      this.usuarioForm.patchValue({roles:listaRoles});
    });
  }

  public cambiaRoles(event:any){
    console.log(event);
    console.log(event.value);
    const listaRoles:number[]=event.value;
    if(listaRoles.length===0){
      this.usuario.roles=[];
    }
    else{
      let rolesAct:Rol[]=[];
      listaRoles.forEach(idRol=>{
        const rolEncontrado=this.roles.find(rol=>rol.id===idRol);
        if(rolEncontrado){
          rolesAct.push(rolEncontrado);
        }
      });
      this.usuario.roles=rolesAct;
    }
  }

  public datosUsuario(){
    if(this.usuarioForm.valid){
      const nombreF=this.usuarioForm.get('nombre');
      const emailF=this.usuarioForm.get('email');
      if(nombreF){
        this.usuario.name=nombreF.value!;
      }
      if(emailF){
        this.usuario.email=emailF.value!;
      }      
    }
    return this.usuario;
  }

  public cerrar(){
    this.dialog.close();
  }

}
