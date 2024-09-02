import { Component, Inject } from '@angular/core';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RolDialogComponent } from '../rol-dialog/rol-dialog.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-catalogo-dialog',
  templateUrl: './catalogo-dialog.component.html',
  styleUrl: './catalogo-dialog.component.css'
})
export class CatalogoDialogComponent {

  public catalogoForm=this.formBuilder.group({
    nombre:['',[Validators.required]]
  });

  constructor(public dialog:MatDialogRef<RolDialogComponent>,@Inject(MAT_DIALOG_DATA) public catalogo:Catalogo,private formBuilder:FormBuilder){
    this.catalogoForm.patchValue({nombre:this.catalogo.name});
  }

  public cargarCatalogo(){
    if(this.catalogoForm.valid){
      const nombre=this.catalogoForm.get('nombre');
      if(nombre){
        this.catalogo.name=nombre.value!;
      }
    }
    return this.catalogo;
  }

  public cerrar(){
    this.dialog.close();
  }

}
