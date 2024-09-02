import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda',
  standalone: true
})
export class MonedaPipe implements PipeTransform {

  transform(value: number, separadorMiles:string='.'): string {
    if(!value){
      return '-';
    }
    else{
      let redondeo=value.toFixed(0);
      let numeroFormato=this.aplicaSeparador(separadorMiles,redondeo);
      return '$ '+numeroFormato;
    }
  }

  public aplicaSeparador(separadorMiles:string,redondeo:string){
    return redondeo.split("").reverse().map((str,index)=>{
      if(index<3){
        return str;
      }
      if(index%3===0){
        return str+separadorMiles;
      }
      else{
        return str;
      }
    }).reverse().join().replaceAll(',','');
  }

}
