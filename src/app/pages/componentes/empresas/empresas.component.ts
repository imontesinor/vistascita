
import { Component } from "@angular/core";
import { ActivatedRoute, Route, Router, RouterLink } from "@angular/router";
import { Empresas } from "app/model/empresas";
import { ServiciosService } from "app/services/servicios.service";


@Component({
    selector:'app-empresas',
    templateUrl:'empresas.component.html'
})


export class EmpresasComponent{
empresas:Empresas[];
empresa:Empresas;
total:number=0;
tamano:number=8;
p:number=1;

constructor(public serviceServicio:ServiciosService,private router:Router, private route:ActivatedRoute){}

listarEmpresas(){
    this.serviceServicio.listarEmpresa(this.p,this.tamano).subscribe((dato:any)=>{
        console.log('listarEmpresa',dato)
   
        setTimeout(()=>{
            this.empresas=dato.content
            this.total=dato.totalElements
          })
         })
                }
ngOnInit(){
    this.listarEmpresas();
}

seleccionEmpre(empre:Empresas){
    console.log('seleccionempre',this.empresa=empre);

}
}