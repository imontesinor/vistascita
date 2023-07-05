import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ServiciosService } from 'app/services/servicios.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private serviceService:ServiciosService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.serviceService.isAuthenticated()){
        this.router.navigate(['/login']);
        return false;
      }
      let role = route.data['role'] as string;
      console.log(role);
      if(this.serviceService.hasRole(role)){
        return true;
      }
      Swal.fire('error', `hola usuario ${this.serviceService.usuario.nombre} no tienes acceso a este recurso`,'warning');
      this.router.navigate(['/pacientes']);
    return false;
  }
  
}
