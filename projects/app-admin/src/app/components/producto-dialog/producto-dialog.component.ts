import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CatalogoService } from '../../services/catalogo.service';
import { Producto } from '../../../../../lib-auth/src/lib/models/producto';
import { Catalogo } from '../../../../../lib-auth/src/lib/models/catalogo';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-dialog',
  templateUrl: './producto-dialog.component.html',
  styleUrl: './producto-dialog.component.css'
})
export class ProductoDialogComponent implements OnInit{

  public productoForm=this.formBuilder.group({
    nombre:['',[Validators.required]],
    precio:[0,[Validators.required,Validators.min(100)]],
    marca:['',[Validators.required]],
    catalogo:['',[Validators.required]]
  });

  constructor(public dialog:MatDialogRef<ProductoDialogComponent>,private catalogoService:CatalogoService,
  @Inject(MAT_DIALOG_DATA) public data:{producto:Producto,catalogos:Catalogo[]},private formBuilder:FormBuilder){

  }

  ngOnInit(): void {
    this.productoForm.patchValue({nombre:this.data.producto.name});
    this.productoForm.patchValue({precio:this.data.producto.prize});
    this.productoForm.patchValue({marca:this.data.producto.marca});
    this.productoForm.patchValue({catalogo:this.data.producto.idCatalogo});
  }

  public datosProducto(){
    if(this.productoForm.valid){
      const nombreF=this.productoForm.get('nombre');
      const precio=this.productoForm.get('prize');
      const marca=this.productoForm.get('marca');
      if(nombreF){
        this.data.producto.name=nombreF.value!;
      }
      if(precio){
        this.data.producto.prize=precio.value!;
      }
      if(marca){
        this.data.producto.marca=marca.value!;
      }
      this.data.producto.idCatalogo=this.productoForm.get('catalogo')!.value!;
    }
    console.log(this.data.producto);

    return this.data.producto;
  }

  public cerrar(){
    this.dialog.close();
  }
}
