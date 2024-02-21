import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';



export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
   
  
}

export const ROUTES: RouteInfo[] = [
  //  { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/pacientes',     title: 'Pacientes',         icon:'nc-single-02',  class: '' },
    { path: '/servicios',     title: 'Servicios',         icon:'nc-globe',  class: '' },
    { path: '/estados',       title: 'Estados',           icon:'nc-diamond',    class: '' },
    { path: '/login',         title: 'Usuarios',          icon:'nc-single-02',  class: '' },
  //  { path: '/citas',         title: 'PacientexCitas',             icon:'nc-paper',      class: '' },
    //{ path: '/citasdeta',         title: 'Citas Detalle',             icon:'nc-paper',      class: '' },
    //{ path: '/cirugia',         title: 'Cirugias',             icon:'nc-tile-56',      class: '' },
    { path: '/procedimientos',         title: 'Procedimientos',             icon:'nc-spaceship',      class: '' },
    { path: '/empresas',         title: 'Empresas',             icon:'nc-spaceship',      class: '' },
   
   // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
   // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  //  { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
   // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    //{ path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
    
];


@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
   
    constructor(public serviceService:ServiciosService,public router:Router){
    
    }
    public menuItems: any[];


    ngOnInit() {
        this.autenticado();
    } 

autenticado(){
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    if(!this.serviceService.isAuthenticated()){
        this.router.navigate(['/login']);  
        
    }else
    this.menuItems;
   
}

logout(): void{
    Swal.fire('Hola',`Usuario ${this.serviceService.usuario.username} has cerrado sesion con exito`, 'success');
    this.serviceService.logout();
    this.router.navigate(['/login']);
    
    
}

}
