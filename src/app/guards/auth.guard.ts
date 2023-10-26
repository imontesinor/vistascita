import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServiciosService } from 'app/services/servicios.service';
import { error } from 'console';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private serviceService:ServiciosService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.serviceService.isAuthenticated()){
        if(this.isTokenExpirado()){
          this.serviceService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      Swal.fire('error','No tiene los permisos necesario', 'error');
      this.router.navigate(['/login']);
    return false;
  }

  isTokenExpirado():boolean{
    let token = this.serviceService.token;
    let payload= this.serviceService.obtenerDatosToken(token);
    let now = new Date().getTime()/1000;

    if(payload.exp < now){
      return true;
    }
    return false;

  }
  
}
