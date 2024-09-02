import { Pipe, PipeTransform } from '@angular/core';
import { Catalogo } from '../../../../lib-auth/src/lib/models/catalogo';

@Pipe({
  name: 'buscaCatalogo'
})
export class BuscaCatalogoPipe implements PipeTransform {

  transform(idCatalogo:string,catalogos:Catalogo[]): string {
    let nombreCatalogo:string='';
    const catalogosFiltrados=catalogos.filter(c=>idCatalogo===c.id);
    if(catalogosFiltrados.length>0){
      nombreCatalogo=catalogosFiltrados[0].name;
    }
    return nombreCatalogo;
  }

}
