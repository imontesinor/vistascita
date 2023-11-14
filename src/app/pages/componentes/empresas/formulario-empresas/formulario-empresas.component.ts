import { Component, Input, Output,EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Empresas } from "app/model/empresas";
import { ServiciosService } from "app/services/servicios.service";
import { throwIfEmpty } from "rxjs";
import Swal from "sweetalert2";



@Component({
    selector: 'app-formulario-empresas',
    templateUrl:'formulario-empresas.component.html'
})


export class FormularioEmpresasComponent{
    
    formuEmpresa: FormGroup;
    @Input() emprerecibo:Empresas;
    @Output() evento= new EventEmitter<Object>();
    empresa:Empresas;



    constructor(private servicioservice:ServiciosService,private route:Router, private fb:FormBuilder){
    this.formuEmpresa=fb.group({
        id:'',
        codigo:'',
        nombre:'',
        estado:''

    })

    }
    guardarEmpresa(){
   this.servicioservice.guardarEmpresa(this.formuEmpresa.value).subscribe((dato:any)=>{
    console.log('guardarempresa',dato);
    Swal.fire('mensaje',`la empresa ${this.formuEmpresa.value.nombre} se guardo correctamente`,"success");
    this.eventoEmpresa();
    this.reset();
   })

    }
    onSubmit(){
        this.guardarEmpresa();
    }


    eventoEmpresa(){
        this.evento.emit(this.empresa);
    }

    ngOnChanges(){
        if(this.emprerecibo){
        this.formuEmpresa.patchValue(this.emprerecibo);
        }else{
            this.empresa= new Empresas;
        }
    }


    reset(){

        this.formuEmpresa.reset();
    }



}


