import { Component, OnDestroy, OnInit } from '@angular/core';
import { LibAuthService } from '../../../../../../lib-auth/src/public-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit,OnDestroy{

  private cambioToken:Subscription=Subscription.EMPTY;
  public rolAdmin=false;

  constructor(private libService:LibAuthService){
  }

  ngOnInit(): void {
    this.rolAdmin=this.libService.tieneRol('ROLE_ADMIN');
    this.cambioToken=this.libService.checkCambioToken$.subscribe(resp=>{
      if(resp){
        this.rolAdmin=this.libService.tieneRol('ROLE_ADMIN');
      }
    });
  }

  ngOnDestroy(): void {
    this.cambioToken.unsubscribe();
  }


}
