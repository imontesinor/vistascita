import { Estados } from "./estados";
import { Pacientes } from "./pacientes";
import { Servicios } from "./servicios";
import { Usuarios } from "./usuarios";



export class Cirugias {
    id:number;
    fecha:Date;
    servicio:Servicios;
    estado:Estados;
    paciente:Pacientes;
    usuario:Usuarios;
}