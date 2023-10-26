import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Procedimientos } from "app/model/procedimientos";
import { Servicios } from "app/model/servicios";
import { ServiciosService } from "app/services/servicios.service";

@Component({
    selector: 'app-procedimientos',
    templateUrl: 'procedimientos.component.html'
})

export class ProcedimientosComponent{

  p:number=1;
  tamano:number=8;
  total:number=0;
  procedimientos:Procedimientos[];
  procedimiento:Procedimientos;
  @Input() enviar: Servicios;

    constructor(public serviservice:ServiciosService,private router:ActivatedRoute,private route:Router){        
    }

    seleccionPro(p:Procedimientos){
      console.log('seleccionPr',this.procedimiento=p);
    }

    listarProcedimientos(){
     this.serviservice.listarProcedimientos(this.p,this.tamano).subscribe((dato:any) =>{
      console.log('procedimientos',dato);
      setTimeout(()=>{
        this.procedimientos=dato.content
        this.total=dato.totalElements
      })
     })
            }

            ngOnInit():void{
                this.listarProcedimientos();
            }

          
      

}