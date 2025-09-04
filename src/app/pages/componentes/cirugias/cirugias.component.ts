import { Component } from "@angular/core";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Cirugias } from "app/model/cirugias";
import { Pacientes } from "app/model/pacientes";
import { Servicios } from "app/model/servicios";
import { ServiciosService } from "app/services/servicios.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs";
import { Subject } from "rxjs/internal/Subject";


@Component({
selector:'app-cirugias',
templateUrl:'cirugias.component.html'
})

export class CirugiasComponent{
    idPaciente;
    cirugia:Cirugias;
    cirugias:Cirugias[];
    p:number=1;
    total:number=0;
    tamano:number=8;
    paciente:Pacientes;
    pacientes:Pacientes[];
    pa:Pacientes;
   // servicio:Servicios;
    query:string='';
    clickSubjet = new Subject<string>();


    constructor(public serviceservicio:ServiciosService,private router:ActivatedRoute,private route:Router){
      this.clickSubjet.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
            switchMap( query => this.serviceservicio.filtrarIdCirugia(query))
        )
        .subscribe((dato:any) => {
            setTimeout(()=> 
            this.cirugias=dato.content,
            this.total= dato.totalElements
            )
        } )
        

    }

    listarCirugia(){
    this.serviceservicio.listarCirugia(this.p,this.tamano).subscribe((dato:any) => {
        console.log(dato);
        setTimeout(()=>{
            this.cirugias=dato.content;
            this.total=dato.totalElements;
        })
    })
   
    }

buscarIdPaciente(){
        this.idPaciente = this.router.snapshot.paramMap.get('id');
        this.serviceservicio.buscarIdPaciente(this.idPaciente).subscribe(
          dato=>{
            console.log(this.paciente=dato)
          }
        )
         console.log('hola5', this.pa = this.idPaciente);

    }

    seleccionCirugia(ci:Cirugias){
       console.log('seleccion cirugia',this.cirugia=ci);

    }

    ngOnInit():void{
        this.listarCirugia();
        this.buscarIdPaciente();
       
    }



    
}