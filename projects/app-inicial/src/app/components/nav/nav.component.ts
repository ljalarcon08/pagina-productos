import { Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { LibAuthService } from '../../../../../lib-auth/src/public-api';
import { Router } from '@angular/router';
import { Usuario } from '../../../../../lib-auth/src/lib/models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit,OnDestroy,OnChanges{
  private breakpointObserver = inject(BreakpointObserver);
  public usuario:Usuario=new Usuario(1,'','','');
  public rolAdmin=false;
  public cambioToken:Subscription=Subscription.EMPTY;

  constructor(private libService:LibAuthService,private router:Router,private usuarioService:UsuarioService){
    this.rolAdmin=libService.tieneRol('ROLE_ADMIN');
  }
  ngOnChanges(changes: SimpleChanges): void {
    const usuario=changes['usuario'].currentValue;
  }
  ngOnDestroy(): void {
    this.cambioToken.unsubscribe;
  }
  ngOnInit(): void {
    this.cambioToken=this.libService.cambioToken.subscribe(resp=>this.rolAdmin=this.libService.tieneRol('ROLE_ADMIN'));
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
