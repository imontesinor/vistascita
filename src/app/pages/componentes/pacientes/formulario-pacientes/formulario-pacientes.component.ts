import  {Component,OnInit,Output,EventEmitter,Input} from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import  {Router} from '@angular/router';
import  {Pacientes} from 'app/model/pacientes';
import { ServiciosService } from 'app/services/servicios.service';
import Swal  from 'sweetalert2';

@Component ({
  selector:'app-formulario-pacientes',
  templateUrl: 'formulario-pacientes.component.html'
})

export class FormularioPacientesComponent{

  public formCamilo:FormGroup;

  @Output() propagar= new EventEmitter<Object>() ;
   pacientes :Pacientes= new Pacientes();
  // @Output() mostrar= new EventEmitter<Object>()
  @Input() pacirecibo:Pacientes;





  constructor(public servicioservice:ServiciosService,public router:Router,private fb:FormBuilder){
   this.formCamilo= this.fb.group({
      id:'',
      cedula:'',
      nombre:'',
      apellidos:'',
      direccion:'',
      telefono:'',
      entidad:''
    })
  }
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

}

 public guardarPaciente(pacientes:any){
  this.servicioservice.guardarPacientes(pacientes.value).subscribe(
    dato=>{
      console.log(dato=this.pacientes);
      Swal.fire(`paciente creado ${this.pacientes.nombre} creado con exito`,'success');
      this.formCamilo.reset();
      this.pacientes.nombre=null;
      this.irPaciente();
    }
    )
}
nuevoPaciente(){
  this.formCamilo.reset();
}



 irPaciente(){
  this.propagar.emit(this.pacientes); }


  onSubmit():void{
    this.guardarPaciente(this.formCamilo);

  }


ngOnChanges(): void {

 if(this.pacirecibo){
  this.formCamilo.patchValue(this.pacirecibo)
 }else{
  this.pacientes=new Pacientes();
 }



  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.

}

}



