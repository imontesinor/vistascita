
import { Component,OnInit,Output,EventEmitter,Input } from '@angular/core';
import { Pacientes } from 'app/model/pacientes';
import { ActivatedRoute,Router } from '@angular/router';
import { ServiciosService } from 'app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-pacientes',
    templateUrl: 'pacientes.component.html'
})

export class PacientesComponent{

     id:any;
  pacientes: Pacientes[];
  pacirecibo:Pacientes;
   p:number=1;
    tamano:number=8;
    total:number=0;
    @Output() enviar=new EventEmitter<Object>();
    pacien:Pacientes;
    query:'';


    constructor(
      public serviciosservice: ServiciosService, public route:ActivatedRoute, public router:Router ) {}

    ngOnInit(): void {
      this.listarPacientes();
    }

    filtrarPacientes(){
      if(this.pacientes==null){
        Swal.fire('mensaje','No se encuentra datos','info')
       }  
      this.serviciosservice.filtrarPaci(this.query).subscribe((dato:any) => {
       
        console.log('filtroPaciente',dato);
           
        setTimeout(()=>{
        
          this.pacientes= dato.content
          this.total=dato.totalElements;
        
        })
      }) 
    
    }


   filPaciente():any{
   return this.pacientes.filter(pa => pa.nombre.toLowerCase().includes(this.query.toLowerCase()));
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
  console.log('ivan',id);
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
