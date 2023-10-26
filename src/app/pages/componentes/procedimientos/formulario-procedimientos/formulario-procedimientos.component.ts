import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Procedimientos } from "app/model/procedimientos";
import { Servicios } from "app/model/servicios";
import { ServiciosService } from "app/services/servicios.service";
import Swal from "sweetalert2";


@Component({
    selector: 'app-formulario-procedimientos',
    templateUrl: 'formulario-procedimientos.component.html'
})


export class FormularioProcedimientosComponent{
@Input() enviar:Procedimientos;
procedimientos:Procedimientos;
formProc:FormGroup;
@Output() eventop=new EventEmitter<Object>();

constructor(private servicioService:ServiciosService, private fb:FormBuilder){
    this.formProc= fb.group({
   
    cups:'',
    nombre:'',
   
    })
}

onSubmit(){
    this.guardarProcedimientos(this.formProc);
}
public nuevoP(){
    this.formProc.reset();
}

ngOnChanges(): void{
    if(this.enviar){
     console.log( 'si se da el envio',  this.formProc.patchValue(this.enviar))
    }
    else{
        this.procedimientos= new Procedimientos();
    }

}

eventoProce(){
    this.eventop.emit(this.procedimientos)
}
guardarProcedimientos(procedimientos:any){
    this.servicioService.guardarProcedimientos(procedimientos.value).subscribe((dato:any)=>{
        console.log('guardarprocedimiento',dato)
        Swal.fire('mensaje',`se creo correctamente ${procedimientos.value.nombre}`);
        this.formProc.reset();
        this.procedimientos.nombre=null;
  
    })

}
}