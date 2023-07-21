import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Servicios } from '../model/servicios';
import { catchError, identity, map, Observable, throwError } from 'rxjs';
import { Pacientes } from '../model/pacientes';
import { Citas } from '../model/citas';
import Swal from 'sweetalert2';
import { Estados } from '../model/estados';
import { Router } from '@angular/router';
import * as e from 'express';
import { Usuarios } from '../model/usuarios';
import { constants } from 'buffer';
@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
private _usuario:Usuarios;
private _token: string;
URL_BACKEND='http://localhost:8080/';
private httpHeaders = new HttpHeaders;
servicios:Servicios[];
pacientes:Pacientes[];
citas:Citas[];
eid:number;
nombre:String;
estados:Estados;
usuarios:Usuarios;

  constructor(public http: HttpClient, public route:Router) { }
 
  public get usuario():Usuarios{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && sessionStorage.getItem('usuario') != null){
     this._usuario= JSON.parse(sessionStorage.getItem('usuario')) as Usuarios;
        return this._usuario;
    }
    return new Usuarios();

  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && sessionStorage.getItem('token') != null){
    this._token= sessionStorage.getItem('token');
        return this._token;
    }
    return null;
  }
 
  private agregarAthorizationHeaders(){
    let token= this.token;
    if(token != null){
      return this.httpHeaders.append('Authorization','Bearer '+ token)
    }else{
     return this.httpHeaders;
    }

  }
  private isNoAutorizado(e):boolean{
    if(e.status==401){
     // Swal.fire('Hola','Por favor verifique que sea un usuario logueado','warning');
      if(this.isAuthenticated()){
         this.logout();
      }
      this.route.navigate(['/login']);
      return true;
      
    } if(e.status==403){
      Swal.fire('Hola',`${this.usuario.username} no tienes acceso a este recurso`,'warning');
      this.route.navigate(['/pacientes']);
      return true;
      
    }else{
      return false;
    }

  }

  hasRole(role:string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;
  }
  guardarUsuarioJwt(access_token:string):void{
    let payload=this.obtenerDatosToken(access_token);
    this._usuario= new Usuarios();
    
    this._usuario.nombre= payload.nombre;
    this._usuario.username=payload.user_name;
    this._usuario.apellido=payload.apellido;
    this._usuario.email= payload.email;
    this._usuario.roles=payload.authorities;
    sessionStorage.setItem('usuario',JSON.stringify(this._usuario)) ;
    
  }
  guardarToken(accessToken:string):void{
  this._token= accessToken;
  sessionStorage.setItem('token',accessToken);
  
  }

  obtenerDatosToken(accesstoken:string):any{
    if(accesstoken != null){
     return JSON.parse(atob(accesstoken.split(".")[1]));
  
      
    }
    return null;
  }

  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name){
      return true;
    }
    return false;
  }
  logout(){
    this._token=null;
    this._usuario=null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
   
  }

 

  listarEstados(pagina:number,size:number){
    return this.http.get<Estados[]>(this.URL_BACKEND+`api/estados/consultar/${(pagina?pagina:1)-1},${size}`,{headers:this.agregarAthorizationHeaders()}).pipe(
     catchError(e=>{
      this.isNoAutorizado(e);
      return throwError(e);
     })
    );

  }

  login(usuario:Usuarios): Observable<any>{
    const urlEndpoind='http://localhost:8080/oauth/token';
    const credenciales= btoa('angularapp'+':'+'12345');
    const httpHeaders = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded',
    'Authorization':'Basic '+credenciales
  });
    let params= new URLSearchParams();
    params.set('grant_type','password');
    
    
    params.set('username',usuario.username);
    params.set('password',usuario.password);
    console.log(params.toString());
    return this.http.post<any>(urlEndpoind, params.toString(), {headers: httpHeaders});  

  }
  listarServicios(pagina:number ,size:number){
    return this.http.get<Servicios[]>(this.URL_BACKEND+`api/servicios/consultar/${(pagina?pagina:1)-1},${size}`);
  }

  listarPacientes(pagina:number,size:number){
   return this.http.get<Pacientes[]>(this.URL_BACKEND+`api/pacientes/consultar/${(pagina?pagina:1)-1},${size}`,{headers: this.agregarAthorizationHeaders()}).pipe(
    catchError(e => {
    this.isNoAutorizado(e);
    return throwError(e);
    })
   );
  }
  listarCitas(pagina:number,size:number){
    return this.http.get<Citas[]>(this.URL_BACKEND+ `api/citas/consultar/${(pagina?pagina:1)-1},${size}`,{headers:this.agregarAthorizationHeaders()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }
  filtrarId(id:any){
    return this.http.get<Citas[]>(this.URL_BACKEND+`api/citas/listarid?id=${id}&pagina=0&size=8`,{headers:this.agregarAthorizationHeaders()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
  }

  filtrarPaci(id:any){

    return this.http.get<Pacientes[]>(this.URL_BACKEND+`api/pacientes/buscarpac?id=${id}&pagina=0&size=8`,{headers:this.agregarAthorizationHeaders()}).pipe(
      catchError(e=>{
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );

  }

  guardarServicios(servicios:Servicios) : Observable<Object>{
    return this.http.post(this.URL_BACKEND+'api/servicios/create',servicios,{headers:this.agregarAthorizationHeaders()}).pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(e.error.mensaje);
        Swal.fire('error',e.error.mensaje,'error');
        return throwError(e);
      })
    );
  }

 
  guardarEstado(estado:Estados){
    return this.http.post(this.URL_BACKEND+'api/estados/guardar',estado, {headers:this.agregarAthorizationHeaders()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
      })
    )
  }
  guardarCita(cita:Citas){
  
    return this.http.post(this.URL_BACKEND+'api/citas/guardar',cita,{headers:this.agregarAthorizationHeaders()}).pipe(
      catchError(e=>{
       this.isNoAutorizado(e);
          return throwError(e);
        })
        )
        }
    
    
 
  listserviciosp(){
return this.http.get<Servicios[]>(this.URL_BACKEND+'api/servicios/consultasp',{headers:this.agregarAthorizationHeaders()}).pipe(
  catchError(e=>{
    this.isNoAutorizado(e);
    return throwError(e);
  })
)

  }
  guardarPacientes(pacientes:Pacientes){
    return this.http.post(this.URL_BACKEND+'api/pacientes/guardar',pacientes,{headers: this.agregarAthorizationHeaders()}).pipe(
      catchError(e=>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        console.error(e.error.mensaje)
        Swal.fire('error no se completo la operacions',e.error.mensaje,'error')
        return throwError(e)
      })
    )
  }

 

  buscarIdPaciente(id:number) : Observable<Pacientes>{
    return this.http.get<Pacientes>(this.URL_BACKEND+ `api/pacientes/consultarid/${id}`,{headers:this.agregarAthorizationHeaders()}).pipe(
      catchError(e =>{
       this.isNoAutorizado(e);
        return throwError(e);

      })
    )
  }

  actualizarServicio(eid:number,servicios:Servicios): Observable<Object>{
    return this.http.put(this.URL_BACKEND+ `servicios/update/${servicios.eid}`,servicios)
  }

  buscarNombre(nombre:String) : Observable<Servicios>{
    return this.http.get<Servicios>(this.URL_BACKEND+ `api/servicios/listarnombre?nombre=${nombre}`);
  }

  buscarid(eid:number) : Observable<Servicios>{
    return this.http.get<Servicios>(this.URL_BACKEND+ `api/servicios/listareid/${eid}`).pipe(
      catchError(e =>{
       console.error(e.error.mensaje);
      Swal.fire('error no se completo la operacions',e.error.mensaje,'error');
        return throwError(e);

      })
    )
  }

  eliminarServicio(eid:number){
    return this.http.delete(this.URL_BACKEND+ `api/servicios/delete/${eid}`);
  }



}
