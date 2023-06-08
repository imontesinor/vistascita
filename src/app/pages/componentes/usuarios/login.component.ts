import { Component,OnInit } from "@angular/core";

import { ActivatedRoute, Route, Router } from "@angular/router";
import { Usuarios } from "app/model/usuarios";
import { ServiciosService } from "app/services/servicios.service";
import Swal from "sweetalert2";

@Component({
    selector:'app-login',
    templateUrl:'login.component.html'
})

export class LoginComponent{

usuario:Usuarios;
titulo:String='Por favor Sign In';

 constructor(public serviceService:ServiciosService,public router:Router, public route:ActivatedRoute){
   this.usuario= new Usuarios();
 }

 ngOnInit() {
     if(this.serviceService.isAuthenticated()){
        Swal.fire('Login',` hola ${this.serviceService.usuario.username} ya estas autenticado!`,'info')
        this.router.navigate(['/pacientes']);
     }
 }

 login():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
        Swal.fire('Login Usuario','Campo vacio username o password','error');
        return;
    }
    this.serviceService.login(this.usuario).subscribe(dato =>{
        console.log(dato);
        
        this.serviceService.guardarUsuarioJwt(dato.access_token);
        this.serviceService.guardarToken(dato.access_token);
        let usuario= this.serviceService.usuario;
        console.log('usuariregistradon',usuario);
        this.router.navigate(['/servicios']);
        Swal.fire('Mensaje', `hola ${usuario.username} iniciaste tu sesion con exito`,'success')
    },e =>{
        if(e.status== 400){
            Swal.fire('error login', 'usuario o contraseña incorrecto', 'error')
        }
    }
    );
}


}