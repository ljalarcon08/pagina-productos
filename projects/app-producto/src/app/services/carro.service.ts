import { Injectable } from '@angular/core';
import { Carro } from '../../../../lib-auth/src/lib/models/carro';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../../../lib-auth/src/lib/services/generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarroService extends GenericService<Carro>{

  public URLL:string='http://localhost:8090/api/producto/carro';

  constructor(private httpC:HttpClient,private libService:LibAuthService) { 
    super(httpC,libService,'http://localhost:8090/api/producto/carro');
  }


  public getCarroEmail(email:string):Observable<Carro>{
    return this.httpC.get<Carro>(`${this.URLL}/email/${email}`,this.libService.getHeader());
  }
}
