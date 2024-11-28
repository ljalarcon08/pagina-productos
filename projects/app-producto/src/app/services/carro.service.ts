import { Injectable } from '@angular/core';
import { Carro } from '../../../../lib-auth/src/lib/models/carro';
import { LibAuthService } from '../../../../lib-auth/src/public-api';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../../../lib-auth/src/lib/services/generic.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {environment} from '../../../../../environments/environment';
import { Producto } from '../../../../lib-auth/src/lib/models/producto';

@Injectable({
  providedIn: 'root'
})
export class CarroService extends GenericService<Carro>{

  public URLL:string=`${environment.serverUrl}/api/producto/carro`;
  private carro=new BehaviorSubject<Carro>(new Carro());
  public carro$=this.carro.asObservable();

  constructor(private httpC:HttpClient,private libService:LibAuthService) { 
    super(httpC,libService,'http://localhost:8090/api/producto/carro');
  }


  public getCarroEmail(email:string):Observable<Carro>{
    return this.httpC.get<Carro>(`${this.URLL}/email/${email}`,this.libService.getHeader());
  }


  public addCarroLocal(carroNuevo:Carro){
    this.carro.next(carroNuevo);
  }

}
