
import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';
import { Pacientes } from 'app/model/pacientes';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';
import { Subject, debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { relative } from 'path';

@Component({
    selector: 'app-pacientes',
    templateUrl: 'pacientes.component.html'
})

export class PacientesComponent{
     searchSubjetc = new Subject<string>();
     id:any;
  pacientes: Pacientes[];
  pacirecibo:Pacientes;
   p:number=1;
    tamano:number=8;
    total:number=0;
  
    pacien:Pacientes;
    //query:'';


    constructor(
      public serviciosservice: ServiciosService, public route:ActivatedRoute, public router:Router ) {}

    ngOnInit(): void {
      this.listarPacientes();
      this.filtrarPacientes();
    }

    filtrarPacientes(){
       this.searchSubjetc.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query:string)=> this.serviciosservice.filtrarPaci(query))
       )
      .subscribe((dato:any) => {
       
        console.log('filtroPaciente',dato);
           
        setTimeout(()=>{
        
          this.pacientes= dato.content
          this.total=dato.totalElements;
        
        })
      }) 
    
    }

    onSearchChange(query:string){
      this.searchSubjetc.next(query);
    }



    listarPacientes() {
      this.serviciosservice
        .listarPacientes(this.p,this.tamano)
        .subscribe((dato:any)=>{
          console.log(dato);
          setTimeout(()=>{
            this.pacientes= dato.content
            this.total=dato.totalElements
          })
        } )

}


buscarId(pa:Pacientes){
console.log(this.pacien=pa);
}


citaPaciente(id:number){
  console.log('idcita',id);
   this.router.navigate([`/citas/${id}`], { relativeTo: this.route });


   
}

irCirugia(id:number){
  console.log('id cx',id);
  this.router.navigate([`/cirugias/${id}`],{relativeTo:this.route});

  }

/* realiza el filtro falta desde listar
capturarString(filtro){
  listarPacientes(filtro)
}*/




}
