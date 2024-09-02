import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Rol } from '../../../../../lib-auth/src/lib/models/rol';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rol-dialog',
  templateUrl: './rol-dialog.component.html',
  styleUrl: './rol-dialog.component.css'
})
export class RolDialogComponent {


  public rolForm=this.formBuilder.group({
    nombre:['',[Validators.required]]
  });

  constructor(public dialog:MatDialogRef<RolDialogComponent>,@Inject(MAT_DIALOG_DATA) public rol:Rol,private formBuilder:FormBuilder){
    this.rolForm.patchValue({nombre:this.rol.name});
  }

  public cargarRol(){
    if(this.rolForm.valid){
      const nombre=this.rolForm.get('nombre');
      if(nombre){
        this.rol.name=nombre.value!;
      }
    }
    return this.rol;
  }

  public cerrar(){
    this.dialog.close();
  }
}
